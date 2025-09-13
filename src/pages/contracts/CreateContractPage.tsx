import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Mock data
const cropTypes = ['Wheat', 'Rice', 'Corn', 'Soybeans', 'Cotton'];
const units = ['kg', 'ton', 'lb'];
const paymentTerms = ['Net 15', 'Net 30', '50% Advance, 50% on Delivery'];

const steps = ['Basic Information', 'Pricing & Quantity', 'Review & Submit'];

const validationSchema = [
  Yup.object({
    cropType: Yup.string().required('Required'),
    variety: Yup.string(),
    deliveryDate: Yup.date().required('Required'),
  }),
  Yup.object({
    quantity: Yup.number().required('Required').positive(),
    unit: Yup.string().required('Required'),
    pricePerUnit: Yup.number().required('Required').positive(),
    paymentTerms: Yup.string().required('Required'),
  }),
  Yup.object({
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms')
      .required('Required'),
  }),
];

const CreateContractPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      cropType: '',
      variety: '',
      deliveryDate: null as Date | null,
      quantity: '',
      unit: 'kg',
      pricePerUnit: '',
      paymentTerms: '',
      termsAccepted: false,
    },
    validationSchema: validationSchema[activeStep],
    onSubmit: async (values) => {
      if (activeStep === steps.length - 1) {
        try {
          setIsSubmitting(true);
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate('/contracts/success');
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setActiveStep(prev => prev + 1);
      }
    },
  });

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Crop Type *</InputLabel>
                <Select
                  name="cropType"
                  value={formik.values.cropType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cropType && Boolean(formik.errors.cropType)}
                >
                  {cropTypes.map((crop) => (
                    <MenuItem key={crop} value={crop}>
                      {crop}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {formik.touched.cropType && formik.errors.cropType}
                </FormHelperText>
              </FormControl>
              
              <TextField
                fullWidth
                margin="normal"
                name="variety"
                label="Variety (Optional)"
                value={formik.values.variety}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Delivery Date"
                  value={formik.values.deliveryDate}
                  onChange={(date: Date | null) => formik.setFieldValue('deliveryDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                      error: formik.touched.deliveryDate && Boolean(formik.errors.deliveryDate),
                      helperText: formik.touched.deliveryDate && formik.errors.deliveryDate,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );
        
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                name="quantity"
                label="Quantity *"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Unit *</InputLabel>
                <Select
                  name="unit"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                margin="normal"
                name="pricePerUnit"
                label="Price Per Unit *"
                type="number"
                value={formik.values.pricePerUnit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pricePerUnit && Boolean(formik.errors.pricePerUnit)}
                helperText={formik.touched.pricePerUnit && formik.errors.pricePerUnit}
                InputProps={{
                  startAdornment: '$',
                }}
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Terms *</InputLabel>
                <Select
                  name="paymentTerms"
                  value={formik.values.paymentTerms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.paymentTerms && Boolean(formik.errors.paymentTerms)}
                >
                  {paymentTerms.map((term) => (
                    <MenuItem key={term} value={term}>
                      {term}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {formik.touched.paymentTerms && formik.errors.paymentTerms}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        );
        
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Contract Details
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography><strong>Crop Type:</strong> {formik.values.cropType}</Typography>
              {formik.values.variety && <Typography><strong>Variety:</strong> {formik.values.variety}</Typography>}
              <Typography><strong>Delivery Date:</strong> {formik.values.deliveryDate?.toLocaleDateString()}</Typography>
              <Typography><strong>Quantity:</strong> {formik.values.quantity} {formik.values.unit}</Typography>
              <Typography><strong>Price Per Unit:</strong> ${formik.values.pricePerUnit}</Typography>
              <Typography><strong>Total Value:</strong> ${(parseFloat(formik.values.quantity || '0') * parseFloat(formik.values.pricePerUnit || '0')).toFixed(2)}</Typography>
              <Typography><strong>Payment Terms:</strong> {formik.values.paymentTerms}</Typography>
            </Paper>
            
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAccepted"
                  checked={formik.values.termsAccepted}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="I agree to the terms and conditions"
            />
            {formik.touched.termsAccepted && formik.errors.termsAccepted && (
              <Typography color="error" variant="caption">
                {formik.errors.termsAccepted}
              </Typography>
            )}
          </Box>
        );
        
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Create New Contract
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <form onSubmit={formik.handleSubmit}>
          {renderStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : activeStep === steps.length - 1 ? (
                'Create Contract'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateContractPage;
