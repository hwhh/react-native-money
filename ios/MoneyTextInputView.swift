import React

@objc(MoneyTextInputView)
class MoneyTextInputView: RCTBaseTextInputView {

    @objc var locale: String? {
        didSet {
            setupDelegate()
        }
    }

    private var maskedDelegate: MoneyInputDelegate?
    private var listener: MaskedRCTBackedTextFieldDelegateAdapter?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupDelegate()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupDelegate()
    }

    private func setupDelegate() {
        guard let textView = self.backedTextInputView as? RCTUITextField else { return }

        // Create the MoneyInputDelegate with the current locale
        maskedDelegate = MoneyInputDelegate(localeIdentifier: locale) { [weak self] (_, value) in
            guard let self = self else { return }
            self.onChange?([
                "text": value,
                "target": self.reactTag as Any,
                "eventCount": self.nativeEventCount,
            ])
        }

        // Set up the listener adapter
        listener = MaskedRCTBackedTextFieldDelegateAdapter(textField: textView)
        maskedDelegate?.listener = listener

        // Assign the masked delegate to the text field
        textView.delegate = maskedDelegate
    }
}