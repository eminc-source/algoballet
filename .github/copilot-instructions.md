# Algorand Ballet - Development Environment

This is the original Algorand Ballet Vue.js application, successfully cloned and running locally for development and wallet integration enhancement.

## Project Overview
- **Technology Stack**: Vue.js 2.7 + TypeScript + Vuetify
- **Current Status**: Original application running successfully
- **Purpose**: Blockchain analysis tool for visualizing wallet transactions and relationships
- **Next Phase**: Add wallet connection functionality using @txnlab/use-wallet

## Key Features (Current)
- Qualitative blockchain analysis for Algorand
- Transaction visualization with Cytoscape.js
- Account and asset relationship mapping
- API integration with Nodely's free indexer
- Responsive UI with Vuetify components

## Development Status
- [x] Repository cloned successfully
- [x] Dependencies installed
- [x] Development server running (localhost:8081)
- [x] VS Code task configured
- [x] Documentation created
- [ ] Wallet integration planning
- [ ] @txnlab/use-wallet integration

## Running the Application
```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm run serve
```

Access at: http://localhost:8081/

## Next Steps
1. Analyze current architecture for wallet integration points
2. Plan @txnlab/use-wallet integration strategy
3. Implement wallet connection UI components
4. Add wallet-gated functionality

## Notes
- Original MIT licensed project by Alexis Rondeau
- All original functionality preserved
- Ready for wallet integration enhancement