> [!WARNING]
> This web component is still being actively developed. It is currently not suitable for production use.

# Grid-aware Websites Info Bar

This web component is designed to work with the [Grid-aware Websites library](https://github.com/thegreenwebfoundation/grid-aware-websites). It aims to provide website users with contextual information about their local energy grid and enables customization options for grid-aware website designs.

## Features

- Display contextual information about the user's local energy grid
- Show different states based on grid carbon intensity (low, moderate, high, or unknown)
- Allow users to opt-out of automatically applying grid-aware website designs
- Enable users to manually switch between different design modes

## Installation

### Via npm

```bash
npm install @greenweb/gaw-info-bar
```

### Import from a CDN

Add the component to your project's HTML using a `script` tag using a code CDN.

```html
<script type="module" src="https://esm.sh/@greenweb/gaw-info-bar"></script>
```

### Add manually to a project

Add the component to a project manually. To do this:

1. Copy the `dist/gaw-info-bar.js` file to your project.
2. In your project's HTML add the following script tag:

```html
<script type="module" src="path/to/gaw-info-bar.js"></script>
```

## Usage

Add the component to your HTML and configure it with appropriate data attributes:

```html
<gaw-info-bar
  data-gaw-level="low"
  data-gaw-location="US"
  data-learn-more-link="https://example.com/grid-aware"
  data-popover-text="Custom information about grid-aware design"
  data-views="default, low, moderate, high"
  data-default-view="default"
>
</gaw-info-bar>
```

### Attributes

| Attribute                    | Description                                           | Values                                                 | Default                                   |
| ---------------------------- | ----------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| `data-gaw-level`             | Current carbon intensity level                        | `"low"`, `"moderate"`, `"high"`                        | `undefined` (shows as "Data unavailable") |
| `data-gaw-location`          | Location code                                         | Alpha-2 country code or valid Electricity Maps Zone ID | `undefined` (shows as "Location unknown") |
| `data-ignore-cookie`         | Name of the cookie used to store user preference      | Any valid cookie name                                  | `"gaw-ignore"`                            |
| `data-ignore-cookie-max-age` | Max age for the ignore cookie                         | Valid cookie max-age in milliseconds                   | `"84600"`                                 |
| `data-learn-more-link`       | URL for the "Learn more" link in the info popover     | Any valid URL                                          | `"#"`                                     |
| `data-popover-text`          | Custom text to display in the info popover            | Any string                                             | Default explanatory text                  |
| `data-views`                 | Comma-separated list of design modes                  | String of comma-separated values                       | `"low,moderate,high"`                     |
| `data-default-view`          | Default design mode when user switches to manual mode | One of the values from `data-views`                    | `"low"`                                   |

## Grid Intensity Levels

The component displays different states based on the specified grid intensity level:

### Low Intensity

```html
<gaw-info-bar data-gaw-level="low" data-gaw-location="TW"></gaw-info-bar>
```

Shows a green indicator with message "Your local grid: Cleaner than average."

### Moderate Intensity

```html
<gaw-info-bar data-gaw-level="moderate" data-gaw-location="TW"></gaw-info-bar>
```

Shows an orange indicator with message "Your local grid: Around average emissions."

### High Intensity

```html
<gaw-info-bar data-gaw-level="high" data-gaw-location="TW"></gaw-info-bar>
```

Shows a red indicator with message "Your local grid: Dirtier than average."

### Unknown Intensity

```html
<gaw-info-bar data-gaw-location="TW"></gaw-info-bar>
```

Shows a gray indicator with message "Your local grid: Data unavailable."

## Location Support

The component supports displaying user-friendly location names for:

- Regular country codes (e.g., "TW" for Taiwan)
- Regions (e.g., "AU-NSW" for New South Wales, Australia)
- Complex regions (e.g., "US-CENT-SPA" displays as "USA - Central")

These location identifiers align with the zones supported by the [Electricity Maps API](https://portal.electricitymaps.com/docs/getting-started#geographical-coverage).

## User Controls

The component provides users with two types of controls:

1. **Auto/Manual Toggle**: Allows users to switch between automatic grid-aware design (based on actual grid intensity) and manual selection.

2. **Manual Mode Buttons**: When auto mode is disabled, users can select between design modes specified in the `data-views` attribute. By default, these are low, moderate, and high grid intensity design modes.

3. **Information Popover**: An information button that displays a popover with explanatory text about the grid-aware design and a "Learn more" link.

These settings are stored in cookies to persist user preferences across page loads:

- `gaw-ignore`: Stores whether the user has opted out of automatic grid-aware design
- `gaw-user-opt-in`: Stores the user's preference for auto/manual mode
- `gaw-manual-view`: Stores the user's manually selected grid intensity level

The component also supports an expandable design that shows/hides additional controls when the user clicks on the expand button.

## Browser Support

This component is built using standard web components and supports all modern browsers.

## Development

### Prerequisites

- Node.js and npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/thegreenwebfoundation/gaw-web-component.git
   cd gaw-web-component
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   This will allow you to preview changes made to the web component.

### Unit tests

You can execute unit tests with:

```bash
npm run test

# or

npm run test:ui
```

## License

[MIT License](LICENSE)

## Credits

Developed by [The Green Web Foundation](https://www.thegreenwebfoundation.org/) as part of their Grid-aware Web initiative.
