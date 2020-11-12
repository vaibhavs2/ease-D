import React from 'react'

import { Text, TextInput, StyleSheet, View } from 'react-native'

export function EditText({ error, ...props }) {

    return (
        <View>

            <TextInput
                style={styles.text_input}
                {...props}
                inlineImageLeft="text_icon"
                inlineImagePadding={28}
                autoFocus={false}
            />
            {error ? (<Text style={styles.error_text} >{error}</Text>) : null}
        </View>
    )
}


const styles = StyleSheet.create({
    text_input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    error_text: {
        color: 'red'
        , fontSize: 12,
        paddingHorizontal: 42
    }
})