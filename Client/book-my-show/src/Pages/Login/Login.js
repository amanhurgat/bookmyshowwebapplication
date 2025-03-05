import {Link} from "react-router-dom";
import {Input, Form , Button, message} from "antd";
import { LoginUser } from "../../Calls/users.js";

function Login(){

  async function onLogin(values){
    const response=await LoginUser(values);
    if(response.success){
      window.alert("User logged in successfully");
      window.location.href="/";
      localStorage.setItem("token",response.token);
    }else{
      window.alert("Invalid Credentials");
    }
  }
    return <>
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>

        <section className="right-section">
          <Form onFinish={onLogin} layout="vertical">
    
          <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
              >
              </Input>

            </Form.Item>

            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button
          color="primary"
             variant="solid"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register Here</Link>
            </p>
            <p>
              Forget Password ? <Link to="/forget">click here </Link>
            </p>
          </div>
        </section>
      </main>
    </header>
  </>
};

export default Login;