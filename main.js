(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);
$(document).ready(function () {
    $("form").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        $.ajax({
            url: "contact_process.php",
            type: "POST",
            data: $(this).serialize(),
            success: function (response) {
                alert(response); // Show response message
            },
            error: function () {
                alert("Something went wrong. Please try again later.");
            }
        });
    });
});
document.getElementById('quote-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    // Log the form data to check what is being sent
    console.log('Form Data:', ...formData.entries());

    fetch('/submit-quote', {
        method: 'POST',
        body: formData
    }).then(response => {
        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log('Server Response:', data);
        if (data.success) {
            alert('Thank you for your quote! It will appear in the testimonials soon.');
            addTestimonial(data.quote);
        } else {
            alert('There was an error submitting your quote.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your quote.');
    });
});

function addTestimonial(quote) {
    const testimonialsContainer = document.querySelector('.owl-carousel');
    const newTestimonial = `
        <div class="testimonial-item text-center">
            <img class="img-fluid bg-light p-2 mx-auto mb-3" src="img/default.jpg" style="width: 90px; height: 90px;">
            <div class="testimonial-text text-center p-4">
                <p>"${quote.note}"</p>
                <h5 class="mb-1">${quote.name}</h5>
                <span class="fst-italic">${quote.service}</span>
            </div>
        </div>
    `;
    testimonialsContainer.innerHTML += newTestimonial;
}
