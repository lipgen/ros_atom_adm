import React, { useState, useEffect } from "react";
import { Action } from "redux";
import { connect, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useHistory } from "react-router-dom";

import "../styles/AdminForm.less";
import { Form, Input, Button } from "antd";
import { authenticate } from "../store/actions";
import { AppState } from "../store";

type AdminFormProps = {
  onLoginClick: (email: string, password: string) => {};
};

const validateMessages = {
  required: "${name} не должен быть пустым",
  types: {
    email: "${name} некорректный email",
  },
};

function AdminForm(props: AdminFormProps) {
  const { onLoginClick } = props;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const session = useSelector((state: AppState) => state.session);
  const history = useHistory();

  useEffect(() => {
    if (session.loggedIn) {
      history.push("/map");
    }
  }, [session.loggedIn, history]);

  const onSubmit = () => {
    onLoginClick(login, password);
  };

  return (
    <div className="container">
      <div className="item relative">
        <div className="text">
          <p className="absolute-title">ЭС ОГР</p>
          <p className="subtitle">
            ЭКСПЕРТНАЯ СИСТЕМА ОЦЕНКИ РИСКОВ ПРОЯВЛЕНИЯ ОПАСНЫХ
            ГИДРОГЕОЛОГИЧЕСКИХ ПРОЦЕССОВ И ЯВЛЕНИЙ НА ПЛОЩАДКЕ РАЗМЕЩЕНИЯ АЭС
          </p>
        </div>
      </div>
      <div className="item">
        <p className="subtitle">ВХОД В СИСТЕМУ</p>
        <Form onFinish={onSubmit} validateMessages={validateMessages}>
          <Form.Item
            name="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input
              className="margin-top-20"
              style={{ background: "transparent" }}
              placeholder="Email"
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="Пароль"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ background: "transparent" }}
              placeholder="Пароль"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            validateStatus={
              session.loading ? "validating" : session.error ? "error" : ""
            }
            help={session.error ? session.error : ""}
          >
            <Button className="margin-top-20" type="primary" htmlType="submit">
              ВОЙТИ
            </Button>
          </Form.Item>
        </Form>
        <div className="linkContainer">
          <a href="#">Не можете войти?</a>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, Action>
) => {
  return {
    onLoginClick: (email: string, password: string) =>
      dispatch(authenticate(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(AdminForm);
