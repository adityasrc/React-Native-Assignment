import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "@/navigation/types";
import { colors } from "@/theme";

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

const OTP_LENGTH = 6;

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<TextInput | null>>(
    Array(OTP_LENGTH).fill(null),
  );

  const handleOtpChange = (value: string, index: number) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpBackspace = (value: string, index: number) => {
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    navigation.navigate("Home" as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        <View style={styles.headingRow}>
          <Text style={styles.headingOrange}>Kickstart </Text>
          <Text style={styles.headingBlack}>your journey</Text>
        </View>

        <Text style={styles.subtitle}>
          We will send you an OTP to verify your number.
        </Text>

        <Text style={styles.label}>Phone number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+91 ∨</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
            placeholder="8812014288"
            placeholderTextColor={colors.textDisabled}
          />
        </View>
        <Text style={styles.hint}>
          Please enter a valid 10-digit mobile number.
        </Text>

        <Text style={styles.label}>Enter the OTP</Text>
        {/* YAHAN FIX KIYA HAI: Ab ye direct updated otpRow style use kar raha hai */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
              value={digit}
              onChangeText={(val) => handleOtpChange(val.slice(-1), index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleOtpBackspace(digit, index);
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  headingOrange: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  headingBlack: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  phoneRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  countryCode: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    justifyContent: "center",
  },
  countryCodeText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.textPrimary,
  },
  hint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 28,
  },
  // FIX: Purana gap: 10 hata kar, space-between aur width 100% laga diya
  otpRow: {
    flexDirection: "row",
    gap: 12, // Ye har dabbe ke beech perfect spacing dega
    width: "100%",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  otpBox: {
    flex: 1, // Ye har dabbe ko screen ke hisaab se equal width dega
    aspectRatio: 1, // Ye Brahamastra hai! Ye width jitni hogi, height bhi utni hi kar dega (Perfect Square 🔲)
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    backgroundColor: colors.background,
    textAlign: "center", 
  },
  otpBoxFilled: {
    borderColor: colors.borderFocused,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: colors.buttonPrimary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: colors.buttonPrimaryText,
    fontSize: 16,
    fontWeight: "600",
  },
});