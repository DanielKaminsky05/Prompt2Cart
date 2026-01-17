# 🛒 Trovato Speak it. Cart it. Own it.

> **UofTHacks 2026 - Shopify Track**

An AI-powered conversational shopping assistant using Universal Commerce Protocol (UCP) to find and purchase products through natural language.

## 🎯 Problem

Finding the right products takes too much effort:
- Endless scrolling through stores
- Comparing shipping options
- Checking ethical sourcing
- Managing personal preferences
- Sorting through countless options

**Our Solution:** Just tell us what you want, and we'll find it for you.

## ✨ How It Works

```
"Hey, I want to buy some running shoes" 
    → AI searches across merchants via UCP
    → Returns top matching products
    → User selects items to cart
    → One-click checkout
```

## 🚀 User Flow

1. **Chat** - User types their shopping query
2. **Discover** - Agent queries UCP for matching products
3. **Select** - User picks items from curated results (3-5 products)
4. **Cart** - Selected items added to cart iteratively
5. **Checkout** - Review cart and authorize payment

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | TBD |
| Backend | TBD |
| Database | TBD |
| AI/Agent | TBD |
| Commerce | UCP (Universal Commerce Protocol) |

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search` | Search products via query |
| POST | `/api/cart/checkout` | Purchase items in cart |
| GET | `/api/products/more` | Generate more product suggestions |
| GET | `/api/user` | Retrieve user info |
| PUT | `/api/user` | Update user info |

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  UCP/MCP    │
│  (Chat UI)  │     │   (API)     │     │ (Merchants) │
└─────────────┘     └──────┬──────┘     └─────────────┘
                          │
                    ┌─────▼─────┐
                    │ AI Agent  │
                    │  (LLM)    │
                    └───────────┘
```

## 🎨 UI Preview

The interface features:
- Clean chat interface with welcome message
- Product cards with: image, name, price, store, delivery time
- Checkbox selection for cart
- Related items suggestions

## 🔮 Stretch Goals

- [ ] User shopping profiles (preferences, budget, style)
- [ ] AI try-on visualization (Gemini API)
- [ ] Advanced filters (price, color, size)
- [ ] Smart ranking based on user preferences
- [ ] ElevenLabs voice integration

## 👥 Team

Built with ❤️ at UofTHacks 2026

## 📄 License

MIT
