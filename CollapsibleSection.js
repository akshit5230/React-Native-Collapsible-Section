import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';
import {
  SemiBoldTextOfSize17
} from '../CustomComponents';


class CollapsibleSection extends React.Component {
  constructor(props) {
    super(props);

    // this.icons = {
    //   'minus': global_images.right_arrow_gray,
    //   'plus': global_images.dropdown_gray
    // };
    // console.log("props.title >>>> ", props.title);
    this.state = {
      title: props.title,
      expanded: false,
      minHeight: null, //props.heightOfItem,
      maxHeight: null,
      // maxHeight: (props.numberofitems * props.heightOfItem) + props.numberofitems,
      animation: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("Props are -> ", nextProps)
    this.setState({
      //   title: nextProps.title,
      refreshView: nextProps.refreshView
    });
  }

  toggle() {
    let initialValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  _setMaxHeight(event) {
    // console.log('maxheight setting to ', event.nativeEvent.layout.height)
    let { maxHeight } = this.state
    if (!maxHeight) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height
      });
    }
  }

  _setMinHeight(event) {
    // console.log('minheight setting to ', event.nativeEvent.layout.height)
    let { minHeight } = this.state
    if (!minHeight) {
      this.setState({
        minHeight: event.nativeEvent.layout.height,
        animation: new Animated.Value(event.nativeEvent.layout.height)
      });
    }

  }

  render() {
    // let icon = this.icons['plus'];

    // if (this.state.expanded) {
    //   icon = this.icons['minus'];
    // }
    let { item, onPressEdit, onPressDelete, title, access } = this.props
    // console.log('access is', access)
    //Step 5
    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]} >
        <TouchableOpacity
          style={styles.titleContainer}
          activeOpacity={0.8}
          onPress={this.toggle.bind(this)}
          onLayout={this._setMinHeight.bind(this)}
        >
          <View style={styles.header}>
            <SemiBoldTextOfSize17 text={title} style={{ flex: 1, paddingRight: 10, color: "#596D88" }} />
            {access == 'Full Action' ?
              <View style={{
                flexDirection: 'row'
              }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => onPressEdit(item)}>
                  <Image source={images.edit_blue} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  activeOpacity={1}
                  onPress={() => onPressDelete(item)}>
                  <Image source={images.icon_delete} />
                </TouchableOpacity>
              </View>
              : null}
          </View>
        </TouchableOpacity>
        <View style={{ height: 2, backgroundColor: '#f7f7f7' }} />
        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }

  static defaultProps = {
    customHeader: null,
    title: null,
    subTitle: null,
    children: null
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
    marginVertical: 4,
    overflow: 'hidden',
    // shadowOffset: { width: 0, height: 0.5, },
    // shadowColor: 'grey',
    // shadowOpacity: 0.2,
    // elevation: 2,
    // shadowRadius: 2,
    // height: 40
  },
  titleContainer: {
    // flexDirection: 'row',
    // height: 50,
    // justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImage: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  body: {
    padding: 10,
    paddingTop: 0
  },
  txtTitle: {
    // fontFamily: "$font_medium",
    // flex: 1,
    padding: 10,
    // margin: 12,
    fontSize: 15,
    // fontWeight: "500",
    color: "#3C4042"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    // borderBottomColor: '#DCE3E8',
    // borderBottomWidth: 0.5,
  }
}
export default CollapsibleSection;