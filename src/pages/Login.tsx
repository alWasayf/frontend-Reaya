import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../app/firebase";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  API_URL,
  loginAsync,
  UserStateInterface,
} from "../app/redux/userSlice";
import Logo from "../images/logo.png";
import "../styles/Login.css";

const Login = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser, isIndividual, isLoggedIn } =
    allState as unknown as UserStateInterface;
  // console.log("🚀 ~ currentUser", currentUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = React.useState(
    currentUser?.phoneNumber
  );
  const [otp, setOtp] = React.useState("");

  const [sent, setSent] = React.useState(false);

  const [isVertified, setIsVertified] = React.useState(false);

  const [error, setError] = React.useState("");

  React.useEffect(() => {
    // console.log("🚀 ~ isIndividual", isIndividual);
  }, [isIndividual]);

  React.useEffect(() => {
    if (currentUser?.firstName === undefined && isLoggedIn) {
      // if type is nanny and not full data
      // navigate("/nanny/profile/edit");
      // if type is user and not full data
      // navigate("/user/profile/edit");
      if (isIndividual) {
        navigate("/user/profile/edit");
      } else {
        navigate("/nanny/profile/edit");
      }
    } else if (isLoggedIn) {
      // if type is nanny and full data
      // navigate("/nanny/profile");
      // if type is user and full data
      // navigate("/home/explore");

      if (isIndividual) {
        navigate("/home/explore");
      } else {
        navigate("/nanny/profile");
      }
    }
  }, []);

  React.useEffect(() => {
    // console.log("🚀 ~ isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const sentOtp = async () => {
    // if user is found, then send otp
    const res: any = await axios.post(`${API_URL}/user/`, {
      phoneNumber,
    });

    const userNotFound = res.data.message === "User Not found";
    if (!userNotFound) {
      const appVerifier = ((window as any).recaptchaVerifier =
        new RecaptchaVerifier(
          "sign-in-button",
          {
            size: "invisible",
            callback: (response: any) => {
              // console.log("🚀 ~ response FROM appVerifier", response);
              setIsVertified(true);
            },
          },
          auth
        ));
      signInWithPhoneNumber(auth, phoneNumber as string, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          (window as any).confirmationResult = confirmationResult;
          setSent(true);
          setError("");
          // console.log("signInWithPhoneNumber RESULT", confirmationResult);

          // ...
        })
        .catch((error) => {
          console.log("error signInWithPhoneNumber", error);
          // Error; SMS not sent
          setError(error);
          // ...
        });
    } else {
      setError(`${res.data.message} Please signup first`);
    }
  };

  const verifyOtp = () => {
    // console.log("🚀 ~ otp", otp);

    (window as any).confirmationResult
      .confirm(otp)
      .then((userCredential: any) => {
        // User signed in successfully.
        // ...
        console.log(" userCredential", userCredential);
        dispatch(
          loginAsync({
            phoneNumber: userCredential.user.phoneNumber,
          })
        );

        if (currentUser?.firstName === undefined && isLoggedIn) {
          // if type is nanny and not full data
          // navigate("/nanny/profile/edit");
          // if type is user and not full data
          // navigate("/user/profile/edit");
          if (isIndividual) {
            navigate("/user/profile/edit");
          } else {
            navigate("/nanny/profile/edit");
          }
        } else if (isLoggedIn) {
          // if type is nanny and full data
          // navigate("/nanny/profile");
          // if type is user and full data
          // navigate("/home/explore");

          if (isIndividual) {
            navigate("/home/explore");
          } else {
            navigate("/nanny/profile");
          }
        }
      })

      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("error verifyOtp", error.message);
        setError(error.message);
      });
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="login">
      <div className="login__box">
        <Link to="/">
          <button
            onClick={() => {
              setError("");
            }}
            className="backButton"
            type="submit"
          >
            back home
          </button>
        </Link>
        <div className="login__logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="login__form">
          {!sent && (
            <div className="login__input">
              <p>Phone number</p>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          )}
          {sent && (
            <div className="login__input">
              <p>OTP</p>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}
          <div id="recaptcha-container" />
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          {sent ? (
            <button
              // disabled={isVertified}
              onClick={verifyOtp}
              type="submit"
            >
              {"Sign In"}
            </button>
          ) : (
            <button id="sign-in-button" onClick={sentOtp} type="submit">
              {"Send OTP"}
            </button>
          )}
          <div className="login__more">
            <p>
              Don't have account? <Link to="/Signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

/*
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      window.localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
};
 */
