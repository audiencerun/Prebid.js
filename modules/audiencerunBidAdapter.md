# Overview

**Module Name**: AudienceRun Bidder Adapter  
**Module Type**: Bidder Adapter  
**Maintainer**: prebid@audiencerun.com 

# Description

Module that connects to AudienceRun demand sources

Use `audiencerun` as bidder.

`zoneId` is required and must be 10 alphanumeric characters.

## AdUnits configuration example
```
    var adUnits = [{
      code: 'test-div',
      mediaTypes: {
        banner: {
          sizes: [
                [300, 600]
            ],
        }
      },
      bids: [{
          bidder: 'audiencerun',
          params: { 
              zoneId: '5o3zc76yrf'
          }
      }]
    },{
      code: 'test-div',
      mediaTypes: {
        banner: {
          sizes: [
                [320, 50]
            ],
        }
      },
      bids: [{
          bidder: 'audiencerun',
          params: { 
              zoneId: 'rbq0i2nzig'
          }
      }]
    }];
```
