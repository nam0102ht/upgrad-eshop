import { Box, Button, Container, Snackbar, Step, StepButton, Stepper, Typography } from "@mui/material";
import * as React from "react"
import OrderProduct from "./OrderProduct";
import AddressStep from "../address/AddressStep";
import ConfirmOrder from "../confirmOrder/ConfirmOrder";
import { createOrder } from "../../services/handleOrder";
import { useNavigate } from "react-router-dom";
import { createAddress, findAllAddress } from "../../services/handleAddress";
import { Alert } from "../form/Helper";

const steps = [
    'Items',
    'Address',
    'Confirm order',
];

export default function StepperOrder(props) {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0)
    const [completed, setCompleted] = React.useState({})
    const [message, setMessage] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [severity, setSeverity] = React.useState("success")
    const [address, setAddress] = React.useState({ 
      "id": '',
      "name": '',
      "contactNumber": '',
      "city": '',
      "landmark": '',
      "street": '',
      "state": '',
      "zipcode": '',
      "user": ''
    })


    const [optionAddress, setOptionAddress] = React.useState([{
      "id": '',
      "name": '',
      "contactNumber": '',
      "city": '',
      "landmark": '',
      "street": '',
      "state": '',
      "zipcode": '',
      "user": ''
  }])

  React.useEffect(() => {
      let addresses = findAllAddress()
      addresses.then(v => {
          let addr = v.data.map(add => {
              return {
                  label: `${add.name} --> ${add.city} ${add.state}`,
                  value: add.id
              }
          })
          setOptionAddress(addr)
      })
  }, [])

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const addr = {
          "name": data.get("name"),
          "contactNumber": data.get("contactNumber"),
          "city": data.get('city'),
          "landmark": data.get('landmark'),
          "street": data.get('street'),
          "state": data.get('state'),
          "zipcode": data.get('zipCode')
      }
      let res = createAddress(addr)
      res.then(v => {
          if (v.status) {
              setSeverity('success')
              setOpen(true)
              setMessage(`Address name: ${addr.name} saved successful`)
              let ord = JSON.parse(localStorage.getItem("orders"))
              let arr = [{
                  ...ord[0],
                  'address': v.data
              }]
              setAddress({
                ...addr,
                id: v.data
              })
              localStorage.setItem("orders", JSON.stringify(arr))
          } else {
              setSeverity('error')
              setOpen(true)
              setMessage(`Can't save address name: ${addr.name}`)
          }
      })
  }

  const handleChangeAddress = async (data) => {
      setSeverity('success')
      setOpen(true)
      setMessage(`Choose: ${data.label} successful`)
      let ord = JSON.parse(localStorage.getItem("orders"))
      let arr = [{
          ...ord[0],
          'address': data.value
      }]
      setAddress({
        'id': data.value
      })
      localStorage.setItem("orders", JSON.stringify(arr))
  }


    const totalSteps = () => {
        return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStep = (step) => () => {
      setActiveStep(step);
    };
  
    const handleComplete = async (event, value) => {
      event.preventDefault();
      const newCompleted = completed;
      if (activeStep === 1 && (address.id === null || address.id === '')) {
        setOpen(true)
        setMessage("Please select address!")
        setSeverity('error')
        setActiveStep(1)
        const newCompleted = completed;
        newCompleted[activeStep] = false;
        setCompleted(newCompleted);
        return;
      } else {
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
        if (activeStep === 2) {
          let orders = JSON.parse(localStorage.getItem('orders'))[0]
          let res = await createOrder(orders)
          if (res.status) {
            setOpen(true)
            setMessage("Order placed successfully!")
            setSeverity('success')
            setTimeout(() => {
              navigate(`/home/confirm`)
            }, 3)
          } else {
            setOpen(true)
            setMessage("Create order error")
            setSeverity('error')
          }
        }
      }
    };
    
  
    const handleClose = async (event) => {
      event.preventDefault();
      setOpen(false)
    }
    
    return (
        <Box sx={{ width: '100%' }}>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: "right" }}
              open={open}
              onClose={handleClose}
              key={'topRight'}
            >
              <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                    </StepButton>
                </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                    </Typography>
                </React.Fragment>
                ) : (
                <React.Fragment>
                    <Container  sx={{ mt: 8, mb: 1, py: 1 }}>
                        {
                            activeStep === 0 ? <OrderProduct /> : activeStep === 1 ? <AddressStep 
                                message={message}
                                handleSubmit={handleSubmit}
                                optionAddress={optionAddress}
                                handleChangeAddress={handleChangeAddress}
                            /> : activeStep === 2 ? <ConfirmOrder /> : <></>
                        }
                    </Container>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                    <Box />
                      <Button onClick={event => handleComplete(event, activeStep === 2 ? 'Place Order' : 'Next')} variant="contained">
                          { activeStep === 2
                          ? 'Place Order'
                          : 'Next'}
                      </Button>
                    </Box>
                </React.Fragment>
                )}
            </div>
        </Box>
    )
}