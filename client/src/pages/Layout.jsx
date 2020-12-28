import React from "react";
import { Flag, Form, Grid, Icon, Loader, Segment } from "semantic-ui-react";

export const Layout = () => {
  return (
    <div>
      <Grid columns="equal" stretched divided>
        <Grid.Column>
          <Segment>Lorem ipsum dolor sit.</Segment>
        </Grid.Column>
        <Grid.Column widths={2}>
          <Segment>2</Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Form>
            <Form.Input label="Username" placeholder="Your username" />
            <Form.Input
              labe="Username"
              placeholder="Your password"
              type="password"
            />
            <Form.Button>Submit</Form.Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Segment>1</Segment>
        </Grid.Column>
        <Grid.Column widths={2}>
          <Segment>2</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>3</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>4</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>5</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>6</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>7</Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment>1</Segment>
        </Grid.Column>
        <Grid.Column widths={2}>
          <Segment>2</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>3</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>4</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>5</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>6</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>7</Segment>
        </Grid.Column>
      </Grid>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column only="tablet" color="purple">
            <Segment>1</Segment>
          </Grid.Column>
          <Grid.Column color="red">h</Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid centered container>
        <Grid.Column width={12}>
          <Form>
            <Form.Input label="Username" placeholder="Your username" />
            <Form.Button fluid>Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={4}
          largeScreen={3}
          widescreen={1}
        >
          <Segment>1</Segment>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={4}
          largeScreen={3}
          widescreen={1}
        >
          <Segment>2</Segment>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={4}
          largeScreen={3}
          widescreen={1}
        >
          <Segment>3</Segment>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={4}
          largeScreen={3}
          widescreen={1}
        >
          <Segment>4</Segment>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={4}
          largeScreen={3}
          widescreen={1}
        >
          <Segment>5</Segment>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={4}
          largeScreen={3}
          widescreen={1}
        >
          <Segment>6</Segment>
        </Grid.Column>
      </Grid>
      <Segment>
        <Flag name="ng" />
        <Flag name="us" />
        <Flag name="saudi arabia" />
        <Icon name="circle notched" size="massive" loading />
        <Loader indeterminate content="mail" />
      </Segment>
    </div>
  );
};
