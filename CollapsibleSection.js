import React from 'react';
import {
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

class CollapsibleSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      expanded: false,
      minHeight: null,
      maxHeight: null,
      animation: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
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
    let { maxHeight } = this.state
    if (!maxHeight) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height
      });
    }
  }

  _setMinHeight(event) {
    let { minHeight } = this.state
    if (!minHeight) {
      this.setState({
        minHeight: event.nativeEvent.layout.height,
        animation: new Animated.Value(event.nativeEvent.layout.height)
      });
    }

  }

  render() {
    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]} >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.toggle.bind(this)}
          onLayout={this._setMinHeight.bind(this)}
        >
          {this.props.header}
        </TouchableOpacity>
        <View onLayout={this._setMaxHeight.bind(this)}>
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
    overflow: 'hidden',
  }
}

export default CollapsibleSection;
