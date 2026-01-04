export const TERRAFORM_SAMPLES: Record<"aws" | "azure" | "gcp", string> = {
  aws: `{
  "planned_values": {
    "root_module": {
      "resources": [
        {
          "type": "aws_instance",
          "name": "web_server",
          "values": {
            "instance_type": "t3.medium",
            "availability_zone": "us-east-1a",
            "associate_public_ip_address": true
          }
        },
        {
          "type": "aws_s3_bucket",
          "name": "app_bucket",
          "values": {}
        }
      ]
    }
  }
}`,

  azure: `{
  "planned_values": {
    "root_module": {
      "resources": [
        {
          "type": "azurerm_linux_virtual_machine",
          "name": "vm1",
          "values": {
            "size": "Standard_B2s",
            "location": "eastus"
          }
        },
        {
          "type": "azurerm_storage_account",
          "name": "storage1",
          "values": {
            "account_tier": "Standard"
          }
        }
      ]
    }
  }
}`,

  gcp: `{
  "planned_values": {
    "root_module": {
      "resources": [
        {
          "type": "google_compute_instance",
          "name": "app_vm",
          "values": {
            "machine_type": "e2-medium",
            "zone": "us-central1-a"
          }
        },
        {
          "type": "google_storage_bucket",
          "name": "bucket1",
          "values": {
            "location": "US"
          }
        }
      ]
    }
  }
}`,
};
