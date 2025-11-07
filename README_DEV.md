# Algorand Ballet - Local Development Setup

This is a local development version of the Algorand Ballet application, cloned from the original open-source repository by Alexis Rondeau. This tool provides qualitative blockchain analysis for the Algorand network.

## 🎯 Project Overview

Algorand Ballet is an interactive qualitative analysis tool for the Algorand blockchain that helps you make informed decisions before interacting on the blockchain. It provides:

- **Wallet Analysis**: Get insights into wallet "personalities" based on transaction history
- **Relationship Mapping**: Visualize connections between wallets, assets, and applications  
- **Transaction Visualization**: Interactive graph-based exploration of blockchain data
- **Qualitative Research**: Complement quantitative analysis with behavioral insights

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14+ recommended)
- npm or yarn

### Installation & Setup

1. **Dependencies are already installed** - The project was cloned with all necessary dependencies.

2. **Start the development server:**
   ```bash
   export NODE_OPTIONS=--openssl-legacy-provider
   npm run serve
   ```

3. **Access the application:**
   - Local: http://localhost:8081/
   - Network: http://192.168.1.41:8081/

### Configuration

The application is now configured to use Nodely's free indexer API, so no API key setup is required!

1. **Enter an Algorand account ID or asset ID** to start analyzing
2. **Select the network** (MainNet, TestNet, or BetaNet)

## 📋 Available Scripts

- `npm run serve` - Start development server
- `npm run build` - Build for production  
- `npm run lint` - Run ESLint

## 🎨 Features

### Current Features
- Landing page with project overview
- Search form for account/asset analysis
- Network selection (MainNet/TestNet/BetaNet)
- Interactive visualization framework
- Responsive design with Vuetify
- **Free blockchain data access** via Nodely's indexer API

### Planned Wallet Integration
The next phase will add wallet connection functionality using:
- `@txnlab/use-wallet` for Algorand wallet connections
- Direct wallet interaction capabilities
- Enhanced user authentication

## 🛠 Technology Stack

- **Frontend**: Vue.js 2.7 + TypeScript
- **UI Framework**: Vuetify 2.6
- **Visualization**: Cytoscape.js with Cola layout
- **Build Tool**: Vue CLI
- **API Integration**: Algorand Indexer API via Nodely (free)

## 🏗 Project Structure

```
src/
├── components/          # Vue components
│   ├── MainResearchView.vue
│   ├── Landingpage.vue
│   ├── SearchForm.vue
│   └── APIKeyForm.vue
├── models/             # TypeScript models and utilities
├── views/              # Route-level components
├── router/             # Vue Router configuration
├── store/              # Vuex state management
└── plugins/            # Vue plugins (Vuetify)
```

## 🔧 Development Notes

### Node.js Compatibility
This project requires the legacy OpenSSL provider for Node.js 17+:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

### VS Code Integration
A development task has been configured for VS Code. Use `Ctrl+Shift+P` → "Tasks: Run Task" → "Serve Algorand Ballet"

## 📖 Original Project

This is based on the original [Algorand Ballet](https://github.com/akaalias/algorand-ballet) by Alexis Rondeau. 

- **Original Site**: https://alexisrondeau.me/algorand-ballet/
- **GitHub**: https://github.com/akaalias/algorand-ballet
- **License**: MIT

## 🤝 Contributing

This is a development environment for adding wallet connection features. Future enhancements will include:

1. Wallet connection integration
2. Enhanced transaction analysis
3. Real-time data updates
4. Additional visualization options

## 📄 License

MIT License - Same as the original project

---

**Status**: ✅ Development server running successfully
**Next Steps**: Add wallet connection functionality using @txnlab/use-wallet