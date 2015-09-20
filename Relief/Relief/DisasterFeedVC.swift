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
        let type = object?.valueForKey("Type") as! String
        if type == "Flood" || type == "Flash Flood" {
            cell.imageView?.image = UIImage(named: "fl")
        } else if type == "Tropical Cyclone" {
            cell.imageView?.image = UIImage(named: "to")
        } else if type == "Cold Wave" {
            cell.imageView?.image = UIImage(named: "sn")
        } else {
            cell.imageView?.image = UIImage(named: "eq")
        }
        
        cell.imageView?.image
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        performSegueWithIdentifier("showDetail", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showDetail" {
            let destinationVC = segue.destinationViewController as! DetailVC
            destinationVC.disaster = objectAtIndexPath(tableView.indexPathForSelectedRow())
        }
    }
    
    override func tableView(tableView: UITableView, heightForRowAtIndexPath indexPath: NSIndexPath) -> CGFloat {
        return view.frame.height / 10
    }
    
}