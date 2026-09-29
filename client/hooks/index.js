import { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';

import { UserContext } from '@/providers/UserProvider';
import { PlaceContext } from '@/providers/PlaceProvider';

import { getItemFromLocalStorage, setItemsInLocalStorage, removeItemFromLocalStorage } from '@/utils';
import axiosInstance from '@/utils/axios';

// USER
export const useAuth = () => {
    return useContext(UserContext)
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = getItemFromLocalStorage('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false)
    }, [])

    const register = async (formData) => {
        const { name, email, password } = formData;

        try {
            const { data } = await axiosInstance.post('user/register', {
                name,
                email,
                password,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('token', data.token)
            }
            return { success: true, message: 'Registration successfull' }
        } catch (error) {
            const message = error?.response?.data?.message || 'Registration failed';
            return { success: false, message }
        }
    }

    const login = async (formData) => {
        const { email, password } = formData;

        try {
            const { data } = await axiosInstance.post('user/login', {
                email,
                password,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('token', data.token)
            }
            return { success: true, message: 'Login successfull' }
        } catch (error) {
            const message = error?.response?.data?.message || 'Login failed';
            return { success: false, message }
        }
    }

    const googleLogin = async (credential) => {
        const decoded = jwt_decode(credential);
        try {
            const { data } = await axiosInstance.post('user/google/login', {
                name: `${decoded.given_name} ${decoded.family_name}`,
                email: decoded.email,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('token', data.token)
            }
            return { success: true, message: 'Login successfull' }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const logout = async () => {
        try {
            const { data } = await axiosInstance.get('/user/logout');
            if (data.success) {
                setUser(null);

                // Clear user data and token from localStorage when logging out
                removeItemFromLocalStorage('user');
                removeItemFromLocalStorage('token');
            }
            return { success: true, message: 'Logout successfull' }
        } catch (error) {
            // Even if server is down, clear local state
            setUser(null);
            removeItemFromLocalStorage('user');
            removeItemFromLocalStorage('token');
            return { success: true, message: 'Logged out' }
        }
    }

    const uploadPicture = async (picture) => {
        try {
            const formData = new FormData()
            formData.append('picture', picture)
            const { data } = await axiosInstance.post('/user/upload-picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (userDetails) => {
        const { name, password, picture } = userDetails;
        const email = JSON.parse(getItemFromLocalStorage('user')).email
        try {
            const { data } = await axiosInstance.put('/user/update-user', {
                name, password, email, picture
            })
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    return {
        user,
        setUser,
        register,
        login,
        googleLogin,
        logout,
        loading,
        uploadPicture,
        updateUser
    }
}


// Mock data for when backend is unavailable
const MOCK_PLACES = [
    {
        _id: 'mock-1',
        title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
        address: 'Candolim, Goa, India',
        photos: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
        ],
        description: 'Welcome to our exquisite 1BHK apartment featuring a private jacuzzi, located in the heart of Candolim, Goa. This beautifully designed space offers modern amenities, stylish interiors, and a relaxing atmosphere perfect for couples and solo travelers.\n\nThe apartment features a spacious bedroom with a king-size bed, a fully equipped kitchen, a cozy living area, and a stunning private jacuzzi on the balcony overlooking lush greenery.',
        extraInfo: 'Check-in: 2:00 PM\nCheck-out: 11:00 AM\nNo smoking inside the apartment.\nNo parties or loud music after 10 PM.\nPets are not allowed.',
        maxGuests: 4,
        price: 5000,
        perks: ['wifi', 'parking', 'tv', 'entrance'],
    },
    {
        _id: 'mock-2',
        title: 'Luxury Villa with Private Pool in Baga',
        address: 'Baga, Goa, India',
        photos: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop',
        ],
        description: 'Experience the ultimate luxury at this stunning 3-bedroom villa featuring a private infinity pool, panoramic ocean views, and world-class amenities. Located just minutes from Baga Beach, this villa is perfect for families and groups seeking an unforgettable Goa getaway.',
        extraInfo: 'Private pool available 24/7.\nComplimentary breakfast included.\nAirport transfers can be arranged.',
        maxGuests: 8,
        price: 15000,
        perks: ['wifi', 'parking', 'tv', 'pets', 'entrance'],
    },
    {
        _id: 'mock-3',
        title: 'Cozy Beachfront Studio in Anjuna',
        address: 'Anjuna, Goa, India',
        photos: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
        ],
        description: 'Wake up to the sound of waves at this charming beachfront studio in Anjuna. This compact yet stylish space features floor-to-ceiling windows with direct beach views, a comfortable queen bed, and a modern kitchenette.',
        extraInfo: 'Direct beach access.\nBicycles available for rent.\nWeekly housekeeping included.',
        maxGuests: 2,
        price: 3500,
        perks: ['wifi', 'tv', 'entrance'],
    },
    {
        _id: 'mock-4',
        title: 'Heritage Boutique Stay in Panjim',
        address: 'Panjim, Goa, India',
        photos: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop',
        ],
        description: 'Step into history at this beautifully restored Portuguese heritage home in the Latin Quarter of Panjim. Featuring original azulejo tiles, antique furniture, and modern comforts, this boutique stay offers a unique cultural experience.',
        extraInfo: 'Walking distance to Miramar Beach.\nGuided heritage walks available.\nBreakfast included.',
        maxGuests: 6,
        price: 8000,
        perks: ['wifi', 'parking', 'tv', 'entrance'],
    },
    {
        _id: 'mock-5',
        title: 'Treehouse Retreat in Palolem',
        address: 'Palolem, Goa, India',
        photos: [
            'https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
        ],
        description: 'Escape to nature in this magical treehouse nestled among coconut palms near Palolem Beach. Elevated above the canopy, this eco-friendly retreat features a bamboo-framed bed, open-air shower, and a private deck with breathtaking sunset views.',
        extraInfo: 'Eco-friendly property.\nYoga sessions available on request.\nOrganic breakfast included.',
        maxGuests: 2,
        price: 4500,
        perks: ['wifi', 'entrance'],
    },
    {
        _id: 'mock-6',
        title: 'Modern Apartment with Sea View in Calangute',
        address: 'Calangute, Goa, India',
        photos: [
            'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
        ],
        description: 'Enjoy stunning Arabian Sea views from this modern 2BHK apartment in Calangute. Featuring contemporary design, a fully equipped kitchen, spacious balcony, and premium amenities, this is the ideal base for exploring North Goa.',
        extraInfo: 'Swimming pool access included.\n24/7 security.\nFree parking available.',
        maxGuests: 5,
        price: 6500,
        perks: ['wifi', 'parking', 'tv', 'entrance'],
    },
    {
        _id: 'mock-7',
        title: 'Charming Cottage near Vagator Beach',
        address: 'Vagator, Goa, India',
        photos: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        ],
        description: 'A charming stone cottage surrounded by tropical gardens, just a 5-minute walk from Vagator Beach. Features rustic-chic decor, a hammock-equipped veranda, outdoor dining area, and a peaceful atmosphere away from the tourist crowds.',
        extraInfo: 'Scooter rental available.\nBBQ facilities on request.\nLate checkout subject to availability.',
        maxGuests: 3,
        price: 4000,
        perks: ['wifi', 'parking', 'pets', 'entrance'],
    },
    {
        _id: 'mock-8',
        title: 'Penthouse Suite with Rooftop Terrace',
        address: 'Morjim, Goa, India',
        photos: [
            'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=600&fit=crop',
        ],
        description: 'Live the high life in this spectacular penthouse suite featuring a private rooftop terrace with a plunge pool, 360-degree views of the Arabian Sea, and luxurious interiors. Located in the serene village of Morjim, known for its pristine beach and turtle nesting sites.',
        extraInfo: 'Private rooftop plunge pool.\nIn-house chef available on request.\nAirport pickup included.',
        maxGuests: 6,
        price: 20000,
        perks: ['wifi', 'parking', 'tv', 'entrance'],
    },
];


// PLACES
export const usePlaces = () => {
    return useContext(PlaceContext)
}

export const useProvidePlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPlaces = async () => {
        try {
            const { data } = await axiosInstance.get('/places');
            if (data.places && data.places.length > 0) {
                setPlaces(data.places);
            } else {
                setPlaces(MOCK_PLACES);
            }
        } catch (error) {
            console.error("Backend unreachable, using mock data");
            setPlaces(MOCK_PLACES);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPlaces();
    }, [])

    return {
        places,
        setPlaces,
        loading,
        setLoading
    }
}