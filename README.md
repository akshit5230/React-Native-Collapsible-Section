# React-Native-Collapsible-Section
A collapsible section / section list with customizable section body and child body. Supports both iOS and Android.

## Installation

`npm i --save rn-collapsible-section`

## Usage

### 1. Minimal Example

```
<CollapsibleSection header={
  <View style={{
    padding: 10,
    justifyContent: 'center',
  }}>
    <Text>This is header</Text>
  </View>
}>
  <View>
    <Text>This is body</Text>
  </View>
</CollapsibleSection>
```

### 2. Full Example

```
import React from 'react';
import { View, Text } from 'react-native;
import CollapsibleSection from 'rn-collapsible-section';

export default class MyExample extends React.Component {
  
  render() {
    return (
      <View style={{ padding: 10 }}>
        <CollapsibleSection
          header={
            <View>
              <Text>This is header/collapsed section title</Text>
            </View>
          }
        >
          <View>
            <Text>This is body seen when section is expanded</Text>
          </View>
        </CollapsibleSection>
      </View>
    )
  }
  
}

```

### 3. Flatlist Example (Usage as expandable section list)

```
import React from 'react';
import { View, Text, FlatList } from 'react-native;
import CollapsibleSection from 'rn-collapsible-section';

const favouriteMovies = [
    'Mood of the Day',
    'On your Wedding Day',
    'Seducing Mr. Perfect',
    'Whatcha wearing',
    'Spell Bound',
    '100 Days with Mr. Arrogant',
    'Be with you',
    'My Sassy Girl',
    '200 Pounds Beauty',
    'Cheese in Trap',
    'Love 911'
  ]

export default class MyExample extends React.Component {
  
  render() {
    return (
      <View style={{ padding: 10 }}>
        {this.renderExpandableList()}
      </View>
    )
  }
  
  renderExpandableList() {
    return(
      <FlatList
        data={favouriteMovies}
        renderItem={({item, index}) => (
          this.renderCollapsibleItem(item)
        )
      />
    )
  }
              
  renderCollapsibleItem(item) {
    return (
      <CollapsibleSection
        header={
          <View>
            <Text>{item}</Text>
          </View>
        }
      >
        <View>
          <Text>Details about the movie...</Text>
        </View>
      </CollapsibleSection>
    )
  }

}

```

## Props
| Name  | Usage | Example Value |
| --- | --- | --- |
| header | define the header / collapsed view / default view of the expandable view. On press expand or collapse | <View /> |

Thanks!















