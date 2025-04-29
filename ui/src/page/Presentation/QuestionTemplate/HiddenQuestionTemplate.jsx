function HiddenQuestionTemplate({ slide, editors }) {
    if (slide.tab !== 'question') return null;

    const question = slide.question;
    const editor = editors[question.id];

    if (!editor) return null;

    return null;
}

export default HiddenQuestionTemplate;
