//
//  Twilio-LogIn.swift
//  Relief
//
//  Created by Julius Danek on 9/19/15.
//  Copyright (c) 2015 Julius Danek. All rights reserved.
//

import UIKit
import Alamofire
import Parse

class TwilioVC: UIViewController {
    
    @IBOutlet weak var phoneNumber: UITextField!
    
    @IBOutlet weak var continueLogIn: UIButton!
    
    var verificationCode: String?
    var userPhoneNumber: String?
    
    override func viewDidLoad() {
        continueLogIn.addTarget(self, action: "submitNumber", forControlEvents: .TouchUpInside)
        
        
    }
    
    func submitNumber () {
        
//        let url = "http://api.rwlabs.org/v1/disasters"
//        
//        let params: [String:AnyObject] = [
//            "fields": ["include": ["name", "primary_country", "type.name", "date", "description"]],
//            "filter": ["field": "status", "value": "current"],
//            "sort": ["date:desc"]
//        ]
//        
//        Alamofire.request(.GET, url, parameters: params, encoding: ParameterEncoding.URL, headers: nil).responseJSON(options: NSJSONReadingOptions.AllowFragments, completionHandler: { (request, response, data, error) -> Void in
//            println(data)
//        })
//
        userPhoneNumber = phoneNumber.text
        
        var params:[String:String] = [
            "phoneNumber" : "+1" + userPhoneNumber!
        ]
        
        PFCloud.callFunctionInBackground("sendVerificationCode", withParameters: params) { (result, error) -> Void in
            if error == nil {
                dispatch_async(dispatch_get_main_queue(), { () -> Void in
                    self.verificationCode = result as? String
                    println(self.verificationCode!)
                    self.phoneNumber.text = ""
                    self.phoneNumber.placeholder = "Enter Verification Code"
                    self.continueLogIn.removeTarget(self, action: "submitNumber", forControlEvents: .TouchUpInside)
                    self.continueLogIn.addTarget(self, action: "verifyNumber", forControlEvents: .TouchUpInside)
                })
            }
        }
    }
    
    func verifyNumber () {
        if phoneNumber.text == verificationCode {
            var newUser = PFUser()
            newUser.username = userPhoneNumber!
            newUser.password = "password"
            newUser.signUpInBackgroundWithBlock({ (success, error) -> Void in
                if success {
                    let feed = self.storyboard?.instantiateViewControllerWithIdentifier("DisasterFeedVC") as! DisasterFeedVC
                    
                    self.presentViewController(feed, animated: true, completion: nil)
//                    let chargeVC = SIMChargeCardViewController(publicKey: "sbpb_ZjMyMTI0MGItMDc4YS00MDdiLWI0MmQtMWMyNWNlZGYzNGZj")
//                    
//                    self.presentViewController(chargeVC, animated: true, completion: nil)
                }
            })
        }
    }
    
}