import {
  Input,
  PinInput,
  PinInputField,
  HStack,
  Box,
  Button,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppStrings, UIError } from "../../../core/failures";
import Validator from "../../../core/utils/validators";
import {
  getVerificationCode,
  verifyCode,
} from "../datasources/remote_datasource";

const VerifyVoter = () => {
  const [email, setEmail] = useState("");
  const [isVerifyCode, setIsVerifyCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [disablePin, setDisablePin] = useState(true);

  const [autoFocusPin, setAutoFocusPin] = useState(false);

  let navigate = useNavigate();

  const handleOnChange = (e: any) => setEmail(e.target.value);
  const onPinChange = (value: string) => setPin(value);

  const verifyOtp = async (): Promise<void> => {
    setError("");
    console.log(pin);

    if (Validator.validatePin(pin)) {
      setLoading(true);
      try {
        const result = await verifyCode(email, pin);
        if (result) {
          setLoading(false);
          setAutoFocusPin(false);
          navigate("/voting");
        }
      } catch (error: unknown) {
        if (error instanceof UIError) {
          setError(error.message);
          setLoading(false);
          setPin("");
        } else {
          setError(AppStrings.apiGenericError);
          setLoading(false);
          setPin("");
        }
      }
    } else {
      setError("incomplete pin");
    }
  };

  const getOtp = async (): Promise<void> => {
    //debugging with prints for now
    console.log("entered get otp");
    console.log(email);
    setError("");
    if (Validator.validateEmail(email)) {
      setLoading(true);
      try {
        const result = await getVerificationCode(email);
        if (result) {
          setLoading(false);
          setIsVerifyCode(true);

          alert("an otp code has been sent to your email");
          setDisablePin(false);
          setAutoFocusPin(true);
        }
      } catch (error: unknown) {
        if (error instanceof UIError) {
          setError(error.message);
          setLoading(false);
        } else {
          setError(AppStrings.apiGenericError);
          setLoading(false);
        }
      }
    } else {
      setError("enter a valid email");
    }
  };

  console.log(pin);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" bg="gray.900" p={12} rounded={6}>
        <Heading mb={6}>Let's verify your email</Heading>
        <Input
          placeholder="adjei@gmail.com"
          variant="filled"
          mb={2}
          type="email"
          value={email}
          onChange={handleOnChange}
        ></Input>
        <CustomPinField
          onChange={onPinChange}
          pin={pin}
          isDisabled={disablePin}
          autoFocus={autoFocusPin}
          onComplete={verifyOtp}
        ></CustomPinField>
        {isVerifyCode ? (
          <Button onClick={verifyOtp}>Verify code</Button>
        ) : (
          <Button mt={3} onClick={getOtp}>
            Send Otp
          </Button>
        )}
        {error ? (
          <Text mt={2} color="red" fontSize="xl">
            {error}
          </Text>
        ) : (
          <Text></Text>
        )}

        {loading ? <Text mt={1}>loading...</Text> : <Text></Text>}
        <Button onClick={() => navigate("/voting")}>voting</Button>
      </Flex>
    </Flex>
  );
};

type props = {
  pin: string;
  isDisabled: boolean;
  autoFocus: boolean;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
};

const CustomPinField: React.FC<props> = ({
  pin,
  isDisabled,
  autoFocus,
  onChange,
  onComplete,
}) => {
  return (
    <HStack>
      <Box mb={2} mt={2}>
        <PinInput
          otp
          onComplete={onComplete}
          onChange={onChange}
          mask
          value={pin}
          isDisabled={isDisabled}
          autoFocus={autoFocus}
          type="alphanumeric"
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </Box>
    </HStack>
  );
};

export { VerifyVoter };
