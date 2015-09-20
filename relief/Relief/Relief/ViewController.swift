//
//  ViewController.swift
//  Relief
//
//  Created by Julius Danek on 9/19/15.
//  Copyright (c) 2015 Julius Danek. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController, SIMChargeCardViewControllerDelegate, UITextFieldDelegate {

    @IBOutlet weak var donationField: UITextField!
    var donationAmount: NSDecimalNumber?
    
    @IBOutlet weak var donateButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        donationField.delegate = self
//        donateButton.enabled = false
        
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    func chargeCardCancelled() {
        println("card cancelled")
    }
    
    func creditCardTokenFailedWithError(error: NSError!) {
        println(error)
    }
    
    func creditCardTokenProcessed(token: SIMCreditCardToken!) {
        let url = "https://simplify-test2.herokuapp.com/charge.php"
        
        let params = ["simplifyToken" : token.token]
        
        
        let indicator = UIActivityIndicatorView()
        indicator.center = view.center
        indicator.startAnimating()
        self.view.addSubview(indicator)
        Alamofire.request(.POST, url, parameters: params, encoding: .URL, headers: nil).response { (request, response, data, error) -> Void in
            if error == nil {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    indicator.stopAnimating()
                    indicator.removeFromSuperview()
                    self.view.backgroundColor = UIColor.greenColor()
                    self.donateButton.setTitle("Thank you!", forState: .Normal)
                    self.donateButton.setTitleColor(UIColor.whiteColor(), forState: .Normal)
                })
            }
        }
        
    }
    
//    func textFieldDidBeginEditing(textField: UITextField) {
//        if donationField.text != "" {
//            donateButton.enabled = true
//        } else {
//            donateButton.enabled = false
//        }
//    }
    

    @IBAction func pay(sender: UIButton) {
        
        donationAmount = NSDecimalNumber(string: donationField.text!)
        let chargeVC = SIMChargeCardViewController(publicKey: "sbpb_ZjMyMTI0MGItMDc4YS00MDdiLWI0MmQtMWMyNWNlZGYzNGZj")
        
        chargeVC.delegate = self
        chargeVC.isCVCRequired = true
        chargeVC.isZipRequired = true
        chargeVC.amount = donationAmount!
        
        self.presentViewController(chargeVC, animated: true, completion: nil)
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

