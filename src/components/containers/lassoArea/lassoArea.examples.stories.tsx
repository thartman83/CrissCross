import { Meta, StoryObj } from '@storybook/react';
import LassoArea, {LassoAreaProps} from '@/components/containers/lassoArea/lassoArea';
import SquareGrid from '@/components/layouts/squareGrid/squareGrid';
import CrosswordContextProvider from '@/context/crosswordContext';

const meta: Meta<LassoAreaProps> = {
  title: "Containers/LassoArea/Examples",
  component: LassoArea,
  render: (args) => {
    return (
      <CrosswordContextProvider initArgs={{ width: 5, height: 5, autoSave: false }}>
        {
          <LassoArea {...args } >
            <SquareGrid />
          </LassoArea>
        }
      </CrosswordContextProvider>
    );
  },
};

export default meta;

type LassoAreaStory = StoryObj<LassoAreaProps>

export const BasicLassoArea: LassoAreaStory = {
  args: {

  }
};
