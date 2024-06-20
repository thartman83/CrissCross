import { Meta, StoryObj } from '@storybook/react';
import ToggleSwitch, {ToggleSwitchProps} from '@/components/ui/toggleSwitch/toggleSwitch';
import { within } from '@storybook/test';
import { expect } from '@storybook/jest';
import { userEvent } from '@testing-library/user-event';


const meta: Meta<ToggleSwitchProps> = {
  title: "UI Elements/Toggle Switch/Accessibility Tests",
  component: ToggleSwitch,
  render: (args) => (
    <div style={{backgroundColor: "var(--color-primary)",
                 padding: "5rem",
                 display: "flex",
                 alignItems: "center",
                 borderRadius: "5px",
                }}>
      <ToggleSwitch {...args} />
    </div>
  ),
};

export default meta;

type ToggleSwitchStory = StoryObj<ToggleSwitchProps>

export const AccessibleCheckboxTests: ToggleSwitchStory = {
  args: {

  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const span = checkbox.nextSibling;

    await step(`Hidden checkbox should be position absolute,
                opacity 0 and positioned on top of the label controller `,
       async () => {

         expect(checkbox).toHaveStyle({ 'opacity': '0'});
         expect(checkbox).toHaveStyle({ 'position': 'absolute'});
       });

    await step('Input should be focusable', async () => {

      expect(document.body).toHaveFocus();
      await userEvent.tab();
      expect(checkbox).toHaveFocus();
    });

    await step('Toggle display element should have aria-hidden', async () => {
      expect(span).toHaveAttribute('aria-hidden', 'true');
    });
  },
};
