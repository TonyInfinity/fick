import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

class PhuKienThoiTrangNam extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>PhuKienThoiTrangNam</Text>
            </View>
        );
    }
}

export default PhuKienThoiTrangNam;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});