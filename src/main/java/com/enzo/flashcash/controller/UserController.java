package com.enzo.flashcash.controller;


import ch.qos.logback.core.model.Model;
import com.enzo.flashcash.model.User;
import com.enzo.flashcash.service.SessionService;
import com.enzo.flashcash.service.UserService;
import com.enzo.flashcash.service.form.SignUpForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserController {
    private final UserService userService;
    private final SessionService sessionService;

    public UserController(UserService userService, SessionService sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    // send signup template with an instance of SignupForm
    @GetMapping("/")
    public ModelAndView home(Model model) {
        User user = sessionService.sessionUser();
        return new ModelAndView("home", "user", user);
    }

    //send signup template with instance of signUp form
    @GetMapping("/signup")
    public ModelAndView showSignUpForm() {
        return new ModelAndView("signup", "signUpForm", new SignUpForm());
    }

    @PostMapping("/signup")
    public ModelAndView processRequest(@ModelAttribute("signUpForm") SignUpForm form) {
        userService.registration(form);
        return new ModelAndView("signin");
    }
}

