//
//  DetailVC.swift
//  Relief
//
//  Created by Julius Danek on 9/20/15.
//  Copyright (c) 2015 Julius Danek. All rights reserved.
//

import Foundation
import UIKit
import Parse
import MapKit

class DetailVC: UIViewController {
    
    var disaster: PFObject?
    
    @IBOutlet weak var mapView: MKMapView!
    @IBOutlet weak var textField: UITextView!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let coordinate = CLLocationCoordinate2D(latitude: disaster?.valueForKey("Longitude") as! Double, longitude: disaster?.valueForKey("Latitude") as! Double)
        
        mapView.centerCoordinate = coordinate
        
        var myHomePin = MKPointAnnotation()
        myHomePin.coordinate = coordinate
        myHomePin.title = disaster?.valueForKey("Name") as! String
        self.mapView.addAnnotation(myHomePin)
        
//        var anView:MKAnnotationView = MKAnnotationView()
//        anView.annotation = myHomePin
//        anView.image = UIImage(named:"xaxas")
//        anView.canShowCallout = true
//        anView.enabled = true
        
        textField.text = disaster?.valueForKey("Description") as! String
        
        
    }
    
    @IBAction func donateButton(sender: UIButton) {
        performSegueWithIdentifier("showDonation", sender: self)
    }
    
}