const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", function () {
    const answer = this.nextElementSibling;
    const isOpen = answer.classList.contains("open");

    // Close all answers
    document.querySelectorAll(".faq-answer").forEach((a) => {
      a.classList.remove("open");
    });

    // Toggle current
    if (!isOpen) {
      answer.classList.add("open");
    }
  });
});
