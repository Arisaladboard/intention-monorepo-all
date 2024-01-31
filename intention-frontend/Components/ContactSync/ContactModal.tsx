import React, {useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Touchable, TouchableOpacity} from "react-native"

const ContactModal: React.FC <{contact: any; toggleModalVisibility: () => void }> = ({contact, toggleModalVisibility})=> {

    const [summary, setSummary] = useState<string>("");
    const [questions, setQuestions] = useState<string>("");

    const generateSummary = async () => {
        try {
            // Make a network request to Flask server
            const response = await fetch('http://127.0.0.1:5100/generate-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: summary }), // Pass the text from the first textbox
            });

            // Handle the response
            const data = await response.json();
            const generatedSummary = data.summary;

            // Update the state with the generated summary
            setSummary(generatedSummary);
        } catch (error) {
            console.error('Error generating summary:', error);
        }
    };


    const generateQuestions = async () => {
        try {
            // Make a network request to Flask server
            const response = await fetch('http://127.0.0.1:5100/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: questions }), // Pass the text from the second textbox
            });

            // Handle the response
            const data = await response.json();
            const generatedQuestions = data.questions;

            // Update the state with the generated questions
            setQuestions(generatedQuestions);
        } catch (error) {
            console.error('Error generating questions:', error);
        }
    };

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalTextContainer}>
                    <Text style={[styles.modalText, {textAlign: 'center', paddingBottom: 40}]}>Contact details:</Text>
                    <Text style={styles.modalText}>Name: {`${contact.firstName} ${contact.lastName}`}</Text>
                    <Text style={styles.modalText}>Phone: 206-969-6969</Text>

                    {/*Text Input for Notes*/}
                    <TextInput
                    style = {styles.notesInput}
                    multiline
                    numberOfLines={4}
                    value={summary}
                    onChangeText={(text) => setSummary(text)}
                    placeholder="Please provide notes about ______"
                    />
                    <TextInput
                    style = {styles.notesInput}
                    multiline
                    numberOfLines={4}
                    value={questions}
                    onChangeText={(text) => setQuestions(text)}
                    placeholder="Click Generate Questions"
                    />
                    
                </View>
                
                {/* Buttons for generating summary and questions*/}
                <TouchableOpacity style = {styles.generateButton} onPress={generateSummary}>
                    <Text style={styles.buttonText}>Generate Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.generateButton} onPress={generateQuestions}>
                    <Text style={styles.buttonText}>Generate Questions</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.copyButton} onPress={async () => }>

                </TouchableOpacity>
 
                <Button title="Edit Name"></Button>
                <Button title="Close" onPress={toggleModalVisibility}></Button>

                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    modalView: {
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
    },

    modalBox: {
        height: 600,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 40,
    },

    modalTextContainer: {
        paddingTop: 50,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
    },

    modalText: {
        textAlign: 'left',
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '500'
    },

    notesInput: {
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 2,
        padding: 10,
        marginRight: 10
    },

    generateButton: {
        backgroundColor: "pink",
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    copyButton: {
        backgroundColor: 'green', // Customize the color as needed
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },

});

export default ContactModal;

/* Yeah, so I got a homie named Andrew, he'd be going to the gym, and he's a medical assistant, so like, I don't know what he's doing for school, but I hope he's doing well, because in his clinic, he does most of the work, he does the shots, the allergies, and he takes care of the patients, and you know, he goes in every single day, trying to work hard, motivation, and after the, after the, you know, work days, the long working hours, he goes to the gym and works hard, puts in the hard sweat and tears that, you know, most people wouldn't do, and so like, that's just one hell of a guy right there.*/