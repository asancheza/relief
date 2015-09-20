<?php
    require_once("./lib/Simplify.php");

    /*
    number "5555555555554444"
    expmonth 11
    expyear 15
    cvc 123
    */

    $number = $_POST["number"];
    $expMonth = $_POST["expMonth"];
    $expYear = $_POST["expYear"];
    $cvc = $_POST["cvc"];
    $amount = $_POST["amount"];
    $description = $_POST["description"];

    Simplify::$publicKey = 'sbpb_ZjMyMTI0MGItMDc4YS00MDdiLWI0MmQtMWMyNWNlZGYzNGZj';
    Simplify::$privateKey = 'DyQ6iAM7BBDJGpJPVopUWMAe+QcgNfPriHeonuJ8J7x5YFFQL0ODSXAOkNtXTToq';

    $payment = Simplify_Payment::createPayment(array(
            "card" => array(
                "number" => $number,
                "expMonth" => $expMonth,
                "expYear" => $expYear,
                "cvc" => $cvc
            ),
            'amount' => $amount,
            'description' => $description,
            'currency' => 'USD'
    ));

    if ($payment->paymentStatus == 'APPROVED') {
        header('Content-type: application/json');
        $result = "done";
        echo json_encode($result);
    } else {
        header('Content-type: application/json');
        $result = "fail";
        echo json_encode($result);
        die();
    }
?>