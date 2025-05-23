package com.longkimvo.proathlete.auth.services;

import com.longkimvo.proathlete.auth.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendMail(User user) {
        String subject = "ProAthlete - Verify your account";
        String mailContent = "Hi " + user.getFirstName() + ",\n\n";
        mailContent += "Thank you for signing up for ProAthlete!\n\n";
        mailContent += "Please verify your email address using the verification code below:\n\n";
        mailContent += "Verification Code: " + user.getVerificationCode() + "\n\n";
        mailContent += "If you did not request this, please ignore this email.\n\n";
        mailContent += "Best regards,\n";
        mailContent += "ProAthlete Team";

        try {
            SimpleMailMessage mailMessage =  new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(user.getEmail());
            mailMessage.setText(mailContent);
            mailMessage.setSubject(subject);

            javaMailSender.send(mailMessage);
            return "Email sent!";
        } catch (Exception e) {
            return "Error while sending mail";
        }
    }
}
