import React from 'react';
import { render, cleanup, waitFor, fireEvent, getByText } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import IntlProvider from '../../../../i18n/DopplerIntlProvider.double-with-ids-as-values';
import { AppServicesProvider } from '../../../../services/pure-di';
import { BrowserRouter } from 'react-router-dom';
import { fakeIndustries, fakeStates } from '../../../../services/static-data-client.double';
import { ContactInformation } from './ContactInformation';

describe('Checkout component', () => {
  const contactInformation = {
    email: 'test@makingsense.com',
    firstname: 'Juan',
    lastname: 'Perez',
    address: 'Alem 1234',
    city: 'Tandil',
    province: 'AR-B',
    country: 'ar',
    zipCode: '7000',
    phone: '+542494228090',
    company: 'Test',
    industry: 'IT',
    completed: true,
  };

  const dependencies = {
    dopplerUserApiClient: {
      getContactInformationData: async () => {
        return { success: true, value: contactInformation };
      },
      updateContactInformation: async () => {
        return { success: true };
      },
    },
    staticDataClient: {
      getIndustriesData: async (language) => ({ success: true, value: fakeIndustries }),
      getStatesData: async (country, language) => ({ success: true, value: fakeStates }),
    },
  };

  const ContactInformationElement = () => (
    <AppServicesProvider forcedServices={dependencies}>
      <IntlProvider>
        <BrowserRouter>
          <ContactInformation />
        </BrowserRouter>
      </IntlProvider>
    </AppServicesProvider>
  );

  it('should show contact information', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { getAllByText } = result;

    // Assert
    expect(getAllByText('checkoutProcessForm.contact_information_title').length).toBe(1);
  });

  it('should show messages for empty required fields', async () => {
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getAllByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: '' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: '' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: '' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: '' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: '' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: '' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: '' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getAllByText('validation_messages.error_required_field').length).toBe(8);
  });

  it('should show error message if firstname field is empty', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: '' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: 'Test' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: '1234' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: 'tandil' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: 'ar' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: 'AR-B' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: 'dplr1' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '+54 223 655-8877' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('validation_messages.error_required_field')).toBeInTheDocument();
  });

  it('should show error message if lastname field is empty', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: 'test' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: '' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: '1234' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: 'tandil' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: 'ar' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: 'AR-B' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: 'dplr1' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '+54 223 655-8877' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('validation_messages.error_required_field')).toBeInTheDocument();
  });

  it('should show error message if address field is empty', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: 'Test' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: 'Test' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: '' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: 'tandil' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: 'ar' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: 'AR-B' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: 'dplr1' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '+54 223 655-8877' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('validation_messages.error_required_field')).toBeInTheDocument();
  });

  it('should show error message if city field is empty', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: 'Test' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: 'Test' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: 'address 1' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: '' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: 'ar' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: 'AR-B' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: 'dplr1' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '+54 223 655-8877' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('validation_messages.error_required_field')).toBeInTheDocument();
  });

  it('should show error message if province field is empty', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: 'Test' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: 'Test' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: 'address 1' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: 'tandil' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: 'ar' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: '' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: 'dplr1' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '+54 223 655-8877' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('validation_messages.error_required_field')).toBeInTheDocument();
  });

  it('should show error message if country field is empty', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: 'Test' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: 'Test' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: 'address 1' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: 'tandil' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: '' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: 'AR-B' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: 'dplr1' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '+54 223 655-8877' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('validation_messages.error_required_field')).toBeInTheDocument();
  });

  it('should show error message if phone field is empty', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: 'Test' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: 'Test' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: 'address 1' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: 'tandil' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: 'ar' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: 'AR-B' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: 'dplr1' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('validation_messages.error_required_field')).toBeInTheDocument();
  });

  it('should show error message if industry field is empty', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: 'Test' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: 'Test' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: 'address 1' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: 'tandil' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: 'ar' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: 'AR-B' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: '' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '+54 223 655-8877' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('validation_messages.error_required_field')).toBeInTheDocument();
  });

  it('should show success message if the submit was succesfully', async () => {
    // Arrange
    let result;
    await act(async () => {
      result = render(<ContactInformationElement />);
    });

    const { container, getByText } = result;

    // Act
    act(() => {
      const inputFirstname = container.querySelector('input#firstname');
      fireEvent.change(inputFirstname, { target: { value: 'test' } });

      const inputLastname = container.querySelector('input#lastname');
      fireEvent.change(inputLastname, { target: { value: 'test' } });

      const inputAddress = container.querySelector('input#address');
      fireEvent.change(inputAddress, { target: { value: 'address 1' } });

      const inputCity = container.querySelector('input#city');
      fireEvent.change(inputCity, { target: { value: 'city' } });

      const selectCountry = container.querySelector('select#country');
      fireEvent.change(selectCountry, { target: { value: 'ar' } });

      const selectProvince = container.querySelector('select#province');
      fireEvent.change(selectProvince, { target: { value: 'AR-B' } });

      const selectIndustry = container.querySelector('select#industry');
      fireEvent.change(selectIndustry, { target: { value: 'dplr1' } });

      const inputPhone = container.querySelector('input#phone');
      fireEvent.change(inputPhone, { target: { value: '2494222222' } });
    });

    await act(async () => {
      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.submit(submitButton);
    });

    // Assert
    expect(getByText('checkoutProcessForm.success_msg')).toBeInTheDocument();
  });
});
