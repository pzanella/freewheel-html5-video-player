# 🎬 Freewheel HTML5 Video Player

**Exploration & Documentation** - A simple demo and documentation project exploring the Freewheel client-side library integration with HLS streaming.

## ℹ️ Project Purpose

This project serves as a learning resource for understanding:
- Freewheel client-side ad insertion
- HLS streaming with adaptive bitrate
- State management patterns
- Building video players with Preact

**Note**: This is a basic implementation for educational purposes, not production-ready.

## 🎮 Features

- **HLS Streaming**: Adaptive bitrate streaming via HLS.js
- **Freewheel Integration**: Client-side ad request and insertion
- **Basic Controls**: Play/pause and mute/unmute buttons
- **Click-to-Play**: Manual playback initiation
- **Debug Logging**: Query parameter `?log` for console output

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([install NVM](https://github.com/nvm-sh/nvm))
- pnpm package manager

### Development

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
pnpm build
```

Output will be in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

## 🌐 Live Demo

**[View the demo](https://pzanella.github.io/freewheel-html5-video-player/)**

The project is automatically deployed to GitHub Pages on each push to `main`.

## 🔧 Configuration

Update the player configuration in the HTML page or pass it directly:

```javascript
const playerConfig = {
    assetId: "your-asset-id",
    manifestUrl: "https://your-hls-manifest.m3u8"
};

const player = new Player();
player.init(playerConfig);
```

## 🐛 Debug & Demo Controls

### Query Parameters

The demo page provides controls to manage query parameters:

- **`?log`** - Enable console debug logging
  - Click "Toggle Logging" button to add/remove
  - Page reloads when toggled

### Examples

```
# Enable logging
https://pzanella.github.io/freewheel-html5-video-player/?log
```

## 📊 State Management

The player uses **Zustand** for reactive state management:

```typescript
// Store state
{
    type: CONTENT_TYPE,           // ADS | VOD
    playbackStatus: PLAYBACK_STATUS, // PLAYING | PAUSED
    mute: boolean                 // Mute state
}

// Available actions
togglePlayback()  // Toggle between PLAYING/PAUSED
toggleMute()      // Toggle mute state
setType(type)     // Set content type
```

## 🎮 Controls

The player includes:

- **Playback Button**: Play/pause toggle with visual feedback
- **Volume Button**: Mute/unmute toggle
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🏗️ Project Structure

```
src/
├── main.ts              # Player initialization & orchestration
├── store.ts             # Zustand state management
├── logger.ts            # Debug logging utility
├── model.ts             # TypeScript types & enums
├── emitter.ts           # Event emitter base class
├── controls/            # UI components
│   ├── components/
│   │   ├── Icon/        # SVG icon component system
│   │   ├── Playback/    # Play/pause button
│   │   └── Volume/      # Volume button
│   └── index.ts         # Controls coordinator
├── ad-content/          # Freewheel ad integration
│   ├── index.ts
│   ├── model.ts
│   └── config.ts
└── media-content/       # HLS video content
    ├── index.ts
    └── model.ts

index.html              # Landing page with demo controls
```

## 📚 Technology Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| **Preact** | 10.27.2 | Lightweight UI framework |
| **Zustand** | 5.0.8 | State management |
| **Vite** | 6.2.0 | Build tool & dev server |
| **TypeScript** | ~5.7.2 | Type safety |
| **HLS.js** | 1.6.2 | HTTP Live Streaming |
| **Tailwind CSS** | CDN | Styling |
| **pnpm** | Latest | Package manager |

## 🔌 Integration

### Using in Your Application

```javascript
// Import Player class
import Player from './path/to/player';

// Configure and initialize
const playerConfig = {
    assetId: "your-asset-id",
    manifestUrl: "https://your-stream.m3u8"
};

const container = document.getElementById('player-container');
const player = new Player();
player.init(playerConfig);

// Listen to events
player.on('play', () => console.log('Playing'));
player.on('pause', () => console.log('Paused'));
```

### Event System

The player fires events throughout its lifecycle:

- `ADS_REQUEST_COMPLETE` - Ad request finished
- `ADS_COMPLETE` - All ads played
- `VIDEO_LOADEDMETADATA` - Video metadata loaded
- `VIDEO_PLAYING` - Video started playing
- `PLAYBACK_STATUS_CHANGED` - Play/pause state changed

## Freewheel events
### onRequestInitiated
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_REQUEST_INITIATED
```
Fired when the ad request initiated.
The following object returns:
```ts
{
    type: "onRequestInitiated",
    target: CONTEXT_INSTANCE,
}
```

### onRequestComplete
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_REQUEST_COMPLETE
```
Fired when the ad request completed, the event triggered after ```context.submitRequest();``` called.
The following object returns:
```ts
{
    type: "onRequestComplete",
    success: boolean,
    response: {
        ads: LIST_OF_ADS,
        ...
    },
    target: CONTEXT_INSTANCE,
}
```

### onSlotStarted
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_SLOT_STARTED
```
Fired when the video ad started.

```ts
{
    type: "onSlotStarted",
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - adInitiated
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_INITIATED
```
Fired when the ad initiated.

```ts
{
    type: "adEvent",
    subType: "adInitiated",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - preInit
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_PREINIT
```

```ts
{
    type: "adEvent",
    subType: "preInit",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - adBufferingStart
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_BUFFERING_START
```
Fired when the video ad buffering started.

```ts
{
    type: "adEvent",
    subType: "adBufferingStart",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - adBufferingEnd
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_BUFFERING_END
```
Fired when the video ad buffering ended.

```ts
{
    type: "adEvent",
    subType: "adBufferingEnd",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - defaultImpression
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_IMPRESSION
```

```ts
{
    type: "adEvent",
    subType: "defaultImpression",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - firstQuartile
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_FIRST_QUARTILE
```
Fired when the 25% video ad completed.

```ts
{
    type: "adEvent",
    subType: "firstQuartile",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - midPoint
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_MIDPOINT
```
Fired when the 50% video ad completed.

```ts
{
    type: "adEvent",
    subType: "midPoint",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - thirdQuartile
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_THIRD_QUARTILE
```
Fired when the 75% video ad completed.

```ts
{
    type: "adEvent",
    subType: "thirdQuartile",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - complete
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_COMPLETE
```
Fired when the video ad completed.

```ts
{
    type: "adEvent",
    subType: "complete",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - adVolumeChange
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_VOLUME_CHANGE
```
Fired when the volume changed.

```ts
{
    type: "adEvent",
    subType: "adVolumeChange",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - _mute
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_MUTE
```
Fired when the video ad muted.

```ts
{
    type: "adEvent",
    subType: "_mute",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - _un-mute
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_UNMUTE
```
Fired when the video ad unmuted.

```ts
{
    type: "adEvent",
    subType: "_un-mute",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - _pause
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_PAUSE
```
Fired when the video ad paused.

```ts
{
    type: "adEvent",
    subType: "_pause",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - _resume
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_RESUME
```
Fired when the video ad playing after pause event.

```ts
{
    type: "adEvent",
    subType: "_resume",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### adEvent - adEnd
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_AD_IMPRESSION_END
```
```ts
{
    type: "adEvent",
    subType: "adEnd",
    adInstance: OBJECT_THAT_DESCRIBE_CREATIVITY,
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### onSlotEnded
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_SLOT_ENDED
```
```ts
{
    type: "onSlotEnded",
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### contentVideoPauseRequest
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_CONTENT_VIDEO_PAUSE_REQUEST
```
Fired before the midroll when the Freewheel library requests control.

```ts
{
    type: "contentVideoPauseRequest",
    slot: SLOT_INSTANCE,
    target: CONTEXT_INSTANCE,
}
```

### contentVideoPaused
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_CONTENT_VIDEO_PAUSED
```
Fired before the midroll when the Freewheel library pauses the content playback.

```ts
{
    type: "contentVideoPaused",
    target: CONTEXT_INSTANCE,
}
```

### contentVideoResumed
Exposed as: 
```bash 
window.tv.freewheel.SDK.EVENT_CONTENT_VIDEO_RESUME_REQUEST
```
Fired after the midroll when content playback resumes.

```ts
{
    type: "contentVideoResumed",
    target: CONTEXT_INSTANCE,
}
```