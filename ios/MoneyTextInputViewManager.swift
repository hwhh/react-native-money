import React

@objc(MoneyTextInputViewManager)
class MoneyTextInputViewManager: RCTBaseTextInputViewManager {

    override func view() -> (MoneyTextInputView) {
        return MoneyTextInputView()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

}