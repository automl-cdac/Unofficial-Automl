from django.db import models
from ingestion.models import Dataset

class PreprocessingStep(models.Model):
    """Model to store preprocessing steps applied to datasets"""
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    step_name = models.CharField(max_length=100)
    step_type = models.CharField(max_length=50, choices=[
        ('cleaning', 'Data Cleaning'),
        ('encoding', 'Encoding'),
        ('scaling', 'Scaling'),
        ('feature_selection', 'Feature Selection'),
        ('dimensionality_reduction', 'Dimensionality Reduction'),
        ('custom', 'Custom'),
    ])
    parameters = models.JSONField(default=dict)
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('running', 'Running'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ], default='pending')
    
    def __str__(self):
        return f"{self.dataset.name} - {self.step_name}"

class PreprocessingPipeline(models.Model):
    """Model to store complete preprocessing pipelines"""
    name = models.CharField(max_length=255)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    steps = models.ManyToManyField(PreprocessingStep)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class PreprocessedDataset(models.Model):
    """Model to store preprocessed datasets"""
    original_dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    pipeline = models.ForeignKey(PreprocessingPipeline, on_delete=models.CASCADE)
    file_path = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    rows = models.IntegerField(default=0)
    columns = models.IntegerField(default=0)
    features = models.JSONField(default=list)  # List of feature names
    
    def __str__(self):
        return f"Preprocessed {self.original_dataset.name}"
