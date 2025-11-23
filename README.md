# Simple Freewheel web player

## Demo
You can see the live player here: [GitHub Pages Demo](https://pzanella.github.io/freewheel-html5-video-player/)

## Quickstart
The project requires Node.js version 20 or higher, you can use [NVM](https://github.com/nvm-sh/nvm).
<br/>
First, you need to install the dependencies. Run the following command:
```bash
npm i
```
After that, run this command to preview the project locally:
```bash
npm run dev
```

## Building for Production
To build the project for production:
```bash
npm run build
```

The output will be in the `dist` directory.

## GitHub Pages Deployment
This project is configured to automatically deploy to GitHub Pages on every push to the `main` branch.

### Setup
1. Push your changes to the `main` branch
2. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages

### Enabling GitHub Pages
If it's your first time deploying:
1. Go to your repository settings on GitHub
2. Navigate to **Pages** section
3. Under "Source", select **Deploy from a branch**
4. Choose **gh-pages** branch and **/(root)** folder
5. Click **Save**

The workflow will automatically create the `gh-pages` branch on first deployment.

### Access Your Player
Once deployed, your player will be available at:
```
https://pzanella.github.io/freewheel-html5-video-player/
```

## Query Parameters
You can enable logging by adding `?log` to the URL:
```
https://pzanella.github.io/freewheel-html5-video-player/?log
```

## Events
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
<a style="font-weight: bold; color: red;">TODO</a>

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
<a style="font-weight: bold; color: red;">TODO</a>

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