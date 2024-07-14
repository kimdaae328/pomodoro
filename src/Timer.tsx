import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { timerState, roundsState, goalsState } from "./atoms";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Style+Script&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  padding: 50px;
	line-height: 1;
  font-family: 'Source Sans Pro', sans-serif;
	background-color: tomato;
	color:white;
  text-align: center;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
	text-decoration:none;
	color:inherit;
}
* {
  box-sizing: border-box;
}
button {
  border: 0;
  background-color: transparent;
  cursor: pointer;
}
`;
const Wrap = styled.div``;
const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 100px;
`;
const TimeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
`;
const TimeNumber = styled(motion.span)`
  font-size: 60px;
  font-weight: 600;
  color: #fff;
`;
const Colon = styled.span`
  font-size: 60px;
  font-weight: 600;
  color: #fff;
`;

const Action = styled.div`
  margin: 100px 0;
`;
const Button = styled(motion.button)`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: tomato;
`;

export default function Timer() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [rounds, setRounds] = useRecoilState(roundsState);
  const [goals, setGoals] = useRecoilState(goalsState);

  useEffect(() => {
    const interval =
      timer.start &&
      setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes === 0) {
            if (interval) clearInterval(interval);
            setTimer((prevTimer) => ({
              ...prevTimer,
              start: false,
              minutes: 25,
              seconds: 0,
            }));
            setRounds((prevRounds) => prevRounds + 1);
            if ((rounds + 1) % 4 === 0) {
              setGoals((prevGoals) => {
                if (prevGoals + 1 >= 12) {
                  return 0;
                } else {
                  return prevGoals + 1;
                }
              });
              setRounds(0);
            }
            return;
          } else {
            setTimer((prevTimer) => ({
              ...prevTimer,
              minutes: prevTimer.minutes - 1,
              seconds: 59,
            }));
          }
        } else {
          setTimer((prevTimer) => ({
            ...prevTimer,
            seconds: prevTimer.seconds - 1,
          }));
        }
      }, 1000);
      if (interval) clearInterval(interval);
  }, [timer, setTimer, setRounds, setGoals, rounds]);

  const handlePause = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      start: false,
    }));
  };

  const handlePlay = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      start: true,
    }));
  };

  return (
    <Wrap>
      <GlobalStyles />
      <Title>Pomodoro</Title>

      <TimeWrap>
        <TimeDisplay>
          <TimeNumber
            animate={
              timer.start ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}
            }
            transition={timer.start ? { duration: 1 } : {}}
          >
            {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
          </TimeNumber>
          <Colon>:</Colon>
          <TimeNumber
            animate={
              timer.start ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}
            }
            transition={timer.start ? { duration: 1, repeat: Infinity } : {}}
          >
            {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
          </TimeNumber>
        </TimeDisplay>
      </TimeWrap>

      <Action>
        {timer.start ? (
          <Button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePause}
          >
            <svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z"></path>
            </svg>
          </Button>
        ) : (
          <Button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlay}
          >
            <svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
            </svg>
          </Button>
        )}
      </Action>

      <div>
        <p>ROUND: {rounds} / 4</p>
        <p>GOAL: {goals} / 12</p>
      </div>
    </Wrap>
  );
}
