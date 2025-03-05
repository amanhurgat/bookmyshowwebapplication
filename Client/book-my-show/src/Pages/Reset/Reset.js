import {Link} from "react-router-dom";
import {Input, Form , Button, message} from "antd";
import { LoginUser, ResetPassword } from "../../Calls/users.js";

function Reset(){
    async function onReset(values){
        const response=await ResetPassword(values);
        console.log(response);

        if(!response.data.success){
          message.error(response.data.message);
        }else{
          window.location.href = "/login";
        }
    }
    return <>
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>

        <section className="right-section">
          <Form onFinish={onReset} layout="vertical">
    
          <Form.Item
              label="OTP"
              htmlFor="otp"
              name="OTP"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="otp"
                type="number"
                placeholder="Enter OTP"
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
                placeholder="Enter your new Password"
                
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
                Reset Password
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
}

export default Reset;