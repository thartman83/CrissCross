import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    darkMode: {
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'body',
      stylePreview: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Introduction', 'UI Elements', 'Composite Elements', 'Containers',
                'Layouts', '*'],
      },
    },
  },
};

export default preview;
