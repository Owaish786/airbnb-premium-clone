#!/bin/bash
# ==============================================================================
# Airbnb Clone - AWS EC2 (Ubuntu) One-Command Setup Script
# Run on your fresh EC2 instance:
#   chmod +x setup-ec2.sh
#   ./setup-ec2.sh
# ==============================================================================

set -e

echo "🚀 Starting EC2 environment configuration..."

# 1. Update system packages
echo "📦 Updating system packages..."
sudo apt-get update -y && sudo apt-get upgrade -y

# 2. Install essential build tools & Git
echo "🔧 Installing Git, curl, build-essential..."
sudo apt-get install -y curl git build-essential nginx

# 3. Install Node.js 20 LTS (NodeSource)
echo "⚡ Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# 4. Install PM2 process manager globally
echo "🔄 Installing PM2..."
sudo npm install -g pm2

# 5. Configure PM2 to start on system boot
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo "✅ Base environment ready! Next steps:"
echo "1. Clone your repo: git clone https://github.com/Owaish786/airbnb-premium-clone.git"
echo "2. Follow the deployment guide to configure .env and start services."
