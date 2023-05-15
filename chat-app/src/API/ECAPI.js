const searchEndpoint = "https://dolphin-proxy.onrender.com/searchProducts"

export const searchProducts = async (productIds) => {

    const response = await fetch(searchEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'FF-Currency': 'USD',
            'FF-Country': 'US',
            'Accept-Language': 'en-US',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjFCMzk0QzY0Q0JCM0Y3RDIyNDY0OUVCNjQ5RkNBM0ZEM0I5NDhERTMiLCJ4NXQiOiJHemxNWk11ejk5SWtaSjYyU2Z5al9UdVVqZU0iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwOi8vZmFyZmV0Y2guY29tIiwibmJmIjoxNjgzOTE0NTAzLCJpYXQiOjE2ODM5MTQ1MDMsImV4cCI6MTY4NDUxOTMwMywiYXVkIjpbImFwaSIsImNvbW1lcmNlLmJhZ3MucmVhZCIsImNvbW1lcmNlLmJhZ3Mud3JpdGUiLCJjb21tZXJjZS5jYXRhbG9nIiwiY29tbWVyY2UubWVyY2hhbnRzIiwiY29tbWVyY2UucHJvbW9ldmFsdWF0aW9ucy5yZWFkIiwiY29tbWVyY2UucHJvbW90aW9ucyIsImNvbW1lcmNlLnJldHVybnMiLCJjb21tZXJjZS5zaXplcHJlZGljdC5yZWFkIiwiY29tbWVyY2UudXNlcmJlbmVmaXRzIiwiY29tbWVyY2UudXNlcnMucHJvbW9jb2RlcyIsImNvbW1zLmluYm94bXNncHJ2Lm1lc3NhZ2VzLnJlYWQiLCJjb21tcy5pbmJveG1zZ3Bydi5tZXNzYWdlcy53cml0ZSIsImV4cGVyaW1lbnRhdGlvbi5mdG9nZ2xlLnJlYWQiLCJmYWJzIiwibWt0LmNvbnRleHR1YWxtZXNzYWdlcy5yZWFkIiwibWt0LnNwZW5kbGV2ZWxwcm9ncmFtLnJlYWQiLCJyZXRhaWwubWVyY2Fzc29jaWF0aW9uIiwicmV0YWlsLm1lcmNhc3NvY2lhdGlvbi53cml0ZSIsInJldGFpbC52aXNpdHMiLCJyZXRhaWwudmlzaXRzLndyaXRlIiwic3RvcmFnZS5maWxlYXBpLmRvd25sb2FkIiwiaHR0cDovL2ZhcmZldGNoLmNvbS9yZXNvdXJjZXMiXSwic2NvcGUiOlsiYXBpIiwiY29tbWVyY2UuYmFncy5yZWFkIiwiY29tbWVyY2UuYmFncy53cml0ZSIsImNvbW1lcmNlLmNhdGFsb2ciLCJjb21tZXJjZS5tZXJjaGFudHMiLCJjb21tZXJjZS5wcm9tb2V2YWx1YXRpb25zLnJlYWQiLCJjb21tZXJjZS5wcm9tb3Rpb25zIiwiY29tbWVyY2UucmV0dXJucyIsImNvbW1lcmNlLnNpemVwcmVkaWN0LnJlYWQiLCJjb21tZXJjZS51c2VyYmVuZWZpdHMiLCJjb21tZXJjZS51c2Vycy5wcm9tb2NvZGVzIiwiY29tbXMuaW5ib3htc2dwcnYubWVzc2FnZXMucmVhZCIsImNvbW1zLmluYm94bXNncHJ2Lm1lc3NhZ2VzLndyaXRlIiwiZXhwZXJpbWVudGF0aW9uLmZ0b2dnbGUucmVhZCIsImZhYnMiLCJta3QuY29udGV4dHVhbG1lc3NhZ2VzLnJlYWQiLCJta3Quc3BlbmRsZXZlbHByb2dyYW0ucmVhZCIsInJldGFpbC5tZXJjYXNzb2NpYXRpb24iLCJyZXRhaWwubWVyY2Fzc29jaWF0aW9uLndyaXRlIiwicmV0YWlsLnZpc2l0cyIsInJldGFpbC52aXNpdHMud3JpdGUiLCJzdG9yYWdlLmZpbGVhcGkuZG93bmxvYWQiXSwiY2xpZW50X2lkIjoiMTlBQjgzQTM3RDgwNDcxMUFDREJDRkE2NDNGRTQzNUQiLCJjbGllbnRfdWlkIjoiMTAwMDIiLCJjbGllbnRfdGVuYW50SWQiOiIxMDAwMCIsImNsaWVudF9ndWVzdCI6IjUwMDAwMTk1NDU1MjEzNTYiLCJqdGkiOiJGRTQ4MjJEODc1MTU2OUM1Q0YzOUVCNkM2NjUyMTM3QiJ9.HjSlpWmQK0cLZ0pvsdrlZfPEOFcQqDxJt5OnNUh_sKabK9yiIk4blfp8i7e4j1gx1maDLjBEAbLKSjOUiCZz-93ZSWQeZVmjgmzhPdjzuch3ff1yhMDkahFLEvCUuwKN1g4h5FgOz3JdzwkpSnNmFcytNBWk4GJGqr9zuPykSgPTQh-vGeEhozM2bsnPComlTHUGiwYO2VFc_RvX6T_iSDFH_pFRM5u_ptNkfYwXeUqJZspP-KBpWyDRJHY8TwUm3mlDytw-bbya7Yv1MbzFUrIvt0TozuB03HO_UQkzv4hJGWkOrckqtb3gw1AJm8KbS6K1CPjN5ykNjG_PJ0g7CV_N3crqhKyqvL-Y2J0pM1DWBcPowh2a-8CuCUQ0c8zXPryp172wh8MHZwHgf1gAh0sCmi6L-3jp1r6iV5aEH1rt2bf0afMqlw-IhpXjhmsVYvLEpDv1xqGNdBQYbbJmQ9QDarB1atlh4iA8ZFspOYapH69CKd8_OsJWaMujNltwR23NwZlN7taS_dDzCy9FXyS9MED2lEcvnPPY8hLludiE-S46Xw93mBAGGj55liUCeWBGIx18iacaabN2oTdFG4xvfKKiFTTESg9FkjNX7h1Cjgf-nKnFszfc0O-qAfzcyhec-dc_knrABt47L-AQ0PfomTwJnstMJC9V35WW6zo'
        },
        body: JSON.stringify({ 'productIds': productIds })
    });

    if(!response.ok) {
        throw new Error('HTTP error! status $(response.status)')
    }

    return await response.json()
};