/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { screen, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { theme } from "@washingtonpost/wpds-theme";
import { Tooltip } from "./";

export default {
  title: "Tooltip",
  component: Tooltip,
  argTypes: {
    density: {
      options: ["default", "compact"],
      control: "select",
    },
    offsetSide: {
      options: [
        theme.space["025"].value,
        theme.space["050"].value,
        theme.space[100].value,
        theme.space[150].value,
        theme.space[200].value,
        theme.space[250].value,
      ],
      control: "select",
    },
  },
};

const Template = (args) => (
  <Tooltip.Provider {...args}>
    <Tooltip.Root defaultOpen={true}>
      <Tooltip.Trigger asChild>
        <img
          src="https://i.pravatar.cc/100?u=test-user@wapo.com"
          alt="avatar image"
        />
      </Tooltip.Trigger>
      <Tooltip.Content {...args}>
        i want lots of things to go here and for this to get super super long
        and for this to never stop and i want more fries and i want it to rain
        but i also want the sun and i wasnt a vacataions and it doesn't matter
        if this is misspelled or whatverer.
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const TemplateRight = (args) => (
  <Tooltip.Provider {...args}>
    <Tooltip.Root defaultOpen={true}>
      <Tooltip.Trigger>
        <span>This is a tooltip trigger</span>
      </Tooltip.Trigger>
      <Tooltip.Content side="right" {...args}>
        <div>
          My Tooltip <br />
          <a href="/">my link</a> <br /> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Magni sint nobis blanditiis nesciunt,
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const TemplateLeft = (args) => (
  <Tooltip.Provider {...args}>
    <Tooltip.Root defaultOpen={true}>
      <Tooltip.Trigger asChild>
        <img
          src="https://i.pravatar.cc/100?u=test-user@wapo.com"
          alt="avatar image"
        />
      </Tooltip.Trigger>
      <Tooltip.Content side="left" {...args}>
        i want lots of things to go here and for this to get super super long
        and for this to never stop and i want more fries and i want it to rain
        but i also want the sun and i wasnt a vacataions and it doesn't matter
        if this is misspelled or whatverer.
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const TemplateBottom = (args) => (
  <Tooltip.Provider {...args}>
    <Tooltip.Root defaultOpen={true}>
      <Tooltip.Trigger>
        <span>This is a tooltip trigger</span>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom" {...args}>
        i want lots of things to go here and for this to get super super long
        and for this to never stop and i want more fries and i want it to rain
        but i also want the sun and i wasnt a vacataions and it doesn't matter
        if this is misspelled or whatverer.
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const TemplateDisabled = (args) => (
  <Tooltip.Provider {...args}>
    <Tooltip.Root defaultOpen={true}>
      <Tooltip.Trigger>
        <span>This is a tooltip trigger</span>
      </Tooltip.Trigger>
      <Tooltip.Content {...args} side="bottom">
        i want lots of things to go here and for this to get super super long
        and for this to never stop and i want more fries and i want it to rain
        but i also want the sun and i wasnt a vacataions and it doesn't matter
        if this is misspelled or whatverer.
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export const Default = Template.bind({});
export const PlacedOnRight = TemplateRight.bind({});
export const PlacedOnLeft = TemplateLeft.bind({});
export const PlacedOnBottom = TemplateBottom.bind({});
export const Disabled = TemplateDisabled.bind({});

Default.args = {
  density: "compact",
  offsetSide: theme.space[100],
  align: "start",
};
PlacedOnRight.args = {};
PlacedOnLeft.args = {};
PlacedOnBottom.args = {};
Disabled.args = { disabled: true };

const InteractionsTemplate = () => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>
        <span>Trigger</span>
      </Tooltip.Trigger>
      <Tooltip.Content side="right">
        <div data-testid="tooltip-content">My Tooltip</div>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export const Interactions = InteractionsTemplate.bind({});

Interactions.parameters = {
  chromatic: { disableSnapshot: true },
};

Interactions.play = async () => {
  await userEvent.hover(screen.getAllByText("Trigger")[0]);
  const contentArray = await screen.findAllByTestId("tooltip-content");
  await expect(contentArray[0]).toBeVisible();
};
