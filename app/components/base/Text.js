import React, { Component } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import * as theme from './theme';

class Text extends Component {
  render() {
    const textStyle = [styles.text];
    const { color, secondary, bold, size, center, style, ...rest} = this.props;

    if (color) {
      textStyle.push({ color });
    }
    if (secondary) {
      textStyle.push({ color: theme.secondaryTextColor });
    }
    if (bold) {
      textStyle.push({ fontWeight: 'bold' });
    }
    if (size) {
      textStyle.push({ fontSize: size });
    }
    if (center) {
      textStyle.push({ textAlign: 'center' });
    }
    if (style) {
      textStyle.push(style);
    }
    const children = typeof this.props.children === 'number'
      ? `${this.props.children}`
      : this.props.children;

    return (
      <RNText {...rest} style={textStyle}>
        {children}
      </RNText>
    );
  }
}


const styles = StyleSheet.create({
  text: {
    borderWidth: 0,
    color: theme.primaryTextColor
  }
});

export default Text;
