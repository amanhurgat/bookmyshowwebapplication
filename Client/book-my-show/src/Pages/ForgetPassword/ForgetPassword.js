import {Link} from "react-router-dom";
import {Input, Form , Button, message} from "antd";
import { LoginUser,onForgetPassword } from "../../Calls/users.js";


function ForgetPassWord(){
async function onSendOTP(values){
    const response=await onForgetPassword(values);
    const res=response.message
    if(res.includes("OTP Sent Successfully")){
        message.success(res);
        window.location.href="/reset";

    }else{
        message.error(res)
    }
}

    return <>
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>

        <section className="right-section">
          <Form onFinish={onSendOTP} layout="vertical">
    
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


            <Form.Item className="d-block">
              <Button
          color="primary"
             variant="solid"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register Here</Link>
            </p>
            <p>
              Existing User ? <Link to="/login">click here </Link>
            </p>
          </div>
        </section>
      </main>
    </header>
  </>
}

export default ForgetPassWord;