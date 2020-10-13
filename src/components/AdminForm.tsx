import React, { useState } from "react";
import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import "../styles/AdminForm.less";
import { Form, Input, Button } from "antd";
import { authenticate } from "../store/actions";
import { AppState } from "../store";

interface RootState {
  state: AppState;
}
interface authState {
  email: string;
  password: string;
}

type AdminFormProps = {
  onLoginClick: (email: string, password: string) => {};
};

function AdminForm(props: AdminFormProps) {
  const { onLoginClick } = props;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
        <Form>
          <Form.Item>
            <Input
              className="margin-top-20"
              style={{ background: "transparent" }}
              placeholder="Логин"
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              style={{ background: "transparent" }}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="margin-top-20"
              type="primary"
              onClick={() => onLoginClick(login, password)}
            >
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
