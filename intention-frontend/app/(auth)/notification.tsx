// Import necessary React and React Native components
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Platform,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Notifications from "expo-notifications";
import { FontAwesome } from "@expo/vector-icons";

// Functional component representing the main App
const Notification: React.FC = () => {
  const [title, setTitle] = useState<string>("Contact");
  const [body, setBody] = useState<string>("Call John Doe at 8:00 PM");
  const [seconds, setSeconds] = useState<number>(0);

  const [popUp, setPopUp] = useState<boolean>(false);
  const touchableOpacityRef = useRef<TouchableOpacity>(null);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [option, setOption] = useState<string>("Choose a interval of time here!");
  const [timeConversionIsFinished, setTimeConversionIsFinished] = useState<boolean>(false);

  const handlePress = () => {
    touchableOpacityRef.current?.measure(
      (x, y, width, height, pageX, pageY) => {
        setCoordinates({ x: pageX, y: pageY });
        setPopUp(true);
      }
    );
  };

  const closeModal = (text: string) => {
    setOption(text);
    setPopUp(false);
  };

  const timeConversion = async (time: string) => {
    if (time === "1 minute") {
      setSeconds(60);
    } else if (time === "1 day") {
      setSeconds(86400);
    } else if (time === "2 days") {
      setSeconds(172800);
    } else if (time === "3 days") {
      setSeconds(259200);
    } else if (time === "1 week") {
      setSeconds(604800);
    } else if (time === "2 weeks") {
      setSeconds(1209600);
    } else if (time === "3 weeks") {
      setSeconds(1814400);
    }
  };

  const [countDown, setCountDown] = useState<number>(seconds);
  useEffect(() => {
    if (timeConversionIsFinished) {
      setCountDown(seconds);
      const intervalId = setInterval(() => {
        setCountDown((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            return 60; // Reset countdown to 60 when it reaches 0
          }
        });
      }, 1000);

      // Cleanup function
      return () => clearInterval(intervalId);
    }
  }, [timeConversionIsFinished]);

  // UseEffect hook to log the updated value of seconds
  useEffect(() => {
    console.log("Seconds updated:", seconds);
  }, [seconds]);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    const clearNotifications = async () => {
      await Notifications.cancelAllScheduledNotificationsAsync();
    };
    clearNotifications();
  }, []);

  useEffect(() => {
    const scheduleNotification = async () => {
      if (timeConversionIsFinished) {
        await scheduleLocalNotification();
      }
    };
    scheduleNotification();
  }, [timeConversionIsFinished]);

  // Function to schedule the local notification
  const scheduleLocalNotification = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("new-emails", {
        name: "E-mail notifications",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "email-sound.wav", // <- for Android 8.0+, see channelId property below
      });
    }
    console.log("Seconds (inside): ", seconds);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        // seconds: timeDifference.minutes * 60 + timeDifference.hours * 3600,
        seconds: seconds,
        channelId: Platform.OS === "android" ? "new-emails" : "",
        repeats: true,
      },
    });
    console.log("Notification scheduled!");
  };

  return (
    <View style={styles.container}>
      <Text>Time left: {countDown}</Text>
      <Button
        title="Tap me!"
        onPress={async () => {
          timeConversion(option);
          setTimeConversionIsFinished(true);
        }}
      />

      <TouchableOpacity
        ref={touchableOpacityRef}
        onPress={handlePress}
        style={{
          width: "80%",
          height: 50,
          borderRadius: 10,
          backgroundColor: "lightgrey",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text>{option}</Text>
        </View>
        <View style={{ marginRight: 30 }}>
          <FontAwesome name="chevron-down" size={12} color="black" />
        </View>
      </TouchableOpacity>

      <Modal visible={popUp} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => closeModal(option)}
        >
          <ScrollView
            style={{
              flex: 1,
              position: "absolute",
              top: coordinates.y,
              left: coordinates.x,
              width: "80%",
              backgroundColor: "lightgrey",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              style={styles.chooseOption}
              onPress={() => closeModal("1 minute")}
            >
              <Text>1 minute</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chooseOption}
              onPress={() => closeModal("1 day")}
            >
              <Text>1 day</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chooseOption}
              onPress={() => closeModal("2 days")}
            >
              <Text>2 days</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chooseOption}
              onPress={() => closeModal("3 days")}
            >
              <Text>3 days</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chooseOption}
              onPress={() => closeModal("1 week")}
            >
              <Text>1 week</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chooseOption}
              onPress={() => closeModal("2 weeks")}
            >
              <Text>2 weeks</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chooseOption}
              onPress={() => closeModal("3 weeks")}
            >
              <Text>3 weeks</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chooseOption: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 10,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
    justifyContent: "center",
    alignItems: "center",
  },
});

// Export the App component
export default Notification;
