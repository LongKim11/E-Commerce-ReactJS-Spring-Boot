package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.entities.Order;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
public class PaymentIntentService {

    public PaymentIntentService() {
        Stripe.apiKey = "sk_test_51R7TW8BFXRoz8HmPLL1EbW6KgzQ4jBOTHf1n59NTMzcZ0cRtdaCMRImYZKvyfwAVDGcMqUQB7rCvEJaOi4LHVLPz005sgrnmiD";
    }

    public String getOrCreateCustomer(User user) throws StripeException {
        CustomerListParams params = CustomerListParams.builder()
                .setEmail(user.getEmail())
                .build();
        List<Customer> customers = Customer.list(params).getData();

        if (!customers.isEmpty()) {
            return customers.getFirst().getId();
        }

        CustomerCreateParams createParams = CustomerCreateParams.builder()
                .setEmail(user.getEmail())
                .setName(user.getFirstName() + " " + user.getLastName())
                .build();
        Customer customer = Customer.create(createParams);

        return customer.getId();
    }

    public Map<String, String> createPaymentIntent(Order order) throws StripeException {
        User user = order.getUser();

        Map<String, String> metaData = new HashMap<>();

        metaData.put("orderID", order.getId().toString());

        PaymentIntentCreateParams paymentIntentCreateParams = PaymentIntentCreateParams
                .builder()
                .setCustomer(getOrCreateCustomer(user))
                .setAmount(1000L)
                .setCurrency("usd")
                .putAllMetadata(metaData)
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                )
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(paymentIntentCreateParams);
        Map<String, String> map = new HashMap<>();
        map.put("client_secret", paymentIntent.getClientSecret());
        return map;
    }
}
