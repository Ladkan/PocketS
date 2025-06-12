/// <reference path="../pb_data/types.d.ts" />

cronAdd("__invite_code_exp__", "*/1 * * * *", () => {
    const codes = arrayOf(new DynamicModel({
        "id": "",
        "active": true,
        "expiration": ""
    }));
    let date = new DateTime();
    $app.recordQuery("invite_codes").select("id","active","expiration").all(codes);

    if(codes.length === 0){
        return;
    } else {
        codes.forEach(el => {
        const exp = new DateTime(el.expiration);
        let record = $app.findRecordById("invite_codes", el.id);
        if(el.active){
            if(date > exp || date === exp){
                console.log("[Cron] - (__invite_code_exp__): " + el.id + " record set to inactive");
                record.set("active", false);
                $app.save(record);
            }
        }
    });
    }
});

cronAdd("__invite_code_inactive_remove__", "0 0 1 * *", () => {
    const codes = arrayOf(new DynamicModel({
        "id": ""
    }));
    
    $app.recordQuery("invite_codes").select("id").andWhere($dbx.hashExp({"active": false})).all(codes);

    if(codes.length === 0){
        console.log("[Cron] - (__invite_code_inactive_remove__): No records to remove");
        return;
    } else {
        codes.forEach(el => {
            let record = $app.findRecordById("invite_codes", el.id);
            $app.delete(record);
            console.log("[Cron] - (__invite_code_inactive_remove__): " + el.id + " record deleted");

        });
    }

});

//Register user notification
onRecordCreateExecute((e) => {
    let notif = NotificationBuilder(e.record.get("invitedBy"),"USER","Invite accepted!","User " + e.record.get("name") + " used your invite code!");
    $app.save(notif);

    e.next();
}, "users");


function NotificationBuilder(userId, type, title, message){
    let record = new Record($app.findCollectionByNameOrId("notifications"));
    record.set("userId", userId);
    record.set("type", type);
    record.set("title", title);
    record.set("message", message);
    record.set("isRead", false);

    return record

}