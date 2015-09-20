//
//  DisasterFeedVC.swift
//  Relief
//
//  Created by Julius Danek on 9/20/15.
//  Copyright (c) 2015 Julius Danek. All rights reserved.
//

import Foundation
import ParseUI
import Parse
import UIKit

class DisasterFeedVC: PFQueryTableViewController {
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.setNavigationBarHidden(false, animated: true)
    }
    
    override func queryForTable() -> PFQuery {
        let query = PFQuery(className: "disasters")
        
        query.orderByDescending("DateOccurred")
        
        return query
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath, object: PFObject?) -> PFTableViewCell? {
        let cell = PFTableViewCell(style: UITableViewCellStyle.Default, reuseIdentifier: "disasterCell")
        cell.textLabel!.text = object?.valueForKey("Name") as! String
        
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        performSegueWithIdentifier("showDetail", sender: self)
    }
    
}