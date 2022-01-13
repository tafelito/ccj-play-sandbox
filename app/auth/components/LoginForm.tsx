import { AuthenticationError, useMutation, Routes } from "blitz";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Form, FORM_ERROR } from "app/core/components/Form";
import login from "app/auth/mutations/login";
import { Login } from "app/auth/validations";

type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Form
              submitText="Login"
              schema={Login}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  await loginMutation(values);
                  props.onSuccess?.();
                } catch (error) {
                  if (error instanceof AuthenticationError) {
                    return {
                      [FORM_ERROR]: "Sorry, those credentials are invalid"
                    };
                  } else {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " +
                        error.toString()
                    };
                  }
                }
              }}
            >
              <LabeledTextField
                name="email"
                label="Email"
                placeholder="admin@admin.com"
              />
              <LabeledTextField
                name="password"
                label="Password"
                type="password"
              />
            </Form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
